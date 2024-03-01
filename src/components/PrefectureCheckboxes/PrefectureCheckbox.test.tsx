// @vitest-environment jsdom
import PrefectureCheckbox from "@/components/PrefectureCheckboxes/PrefectureCheckbox";
import { describe } from "node:test";
import { afterAll, afterEach, beforeAll, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { cleanup, getByText, render, waitFor } from "@testing-library/react";
import { PopulationCompositionResponse } from "@/types/populationCompositionResponse";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { PrefecturesResponse } from "@/types/prefecturesResponse";
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const QueryProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

const server = setupServer(
  http.get("api/prefectures", () => {
    const resData: PrefecturesResponse = { result: [{ prefCode: 1, prefName: "test県" }] };
    return HttpResponse.json(resData);
  }),
  http.get("api/population/composition/perYear", () => {
    const resData: PopulationCompositionResponse = { result: { data: [], boundaryYear: 2020 } };
    return HttpResponse.json(resData);
  })
);

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => server.close());

describe("PrefectureCheckboxes", () => {
  it("loading", async () => {
    // rendering
    const toggleChecked = vi.fn((data: PopulationCompositionResponse["result"] | undefined) => {});

    const { getByText } = render(
      <QueryProvider>
        <PrefectureCheckbox prefecture={{ prefCode: 1, prefName: "test県" }} onChange={toggleChecked} />
      </QueryProvider>
    );

    // assertion
    getByText("test県");
  });

  it("fetch success", async () => {
    // rendering
    const toggleChecked = vi.fn((data: PopulationCompositionResponse["result"] | undefined) => {});

    const { getByRole, baseElement } = render(
      <QueryProvider>
        <PrefectureCheckbox prefecture={{ prefCode: 1, prefName: "test県" }} onChange={toggleChecked} />
      </QueryProvider>
    );

    await waitFor(async () => {
      // action
      const user = userEvent.setup();
      await user.click(getByRole("checkbox"));
      expect(toggleChecked).toHaveBeenCalledWith({ data: [], boundaryYear: 2020 });
    });
  });

  it("fetch fail", async () => {
    // override server response
    server.use(http.get("/api/population/composition/perYear", () => HttpResponse.error()));

    // rendering
    const toggleChecked = vi.fn((data: PopulationCompositionResponse["result"] | undefined) => {});

    const { getByRole } = render(
      <QueryProvider>
        <PrefectureCheckbox prefecture={{ prefCode: 1, prefName: "test県" }} onChange={toggleChecked} />
      </QueryProvider>
    );

    await waitFor(async () => {
      // action
      expect(getByRole("checkbox").attributes).hasOwnProperty("disabled");
    });
  });
});
