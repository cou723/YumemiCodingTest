/* eslint-disable @typescript-eslint/no-floating-promises */
// @vitest-environment jsdom
import type { ReactNode } from "react";
import React from "react";

import { describe } from "node:test";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, getByText, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, expect, it, vi } from "vitest";

import { handlers } from "../../../mocks/handlers";

import type { PopulationCompositionResponse } from "@/types/populationCompositionResponse";

import PrefectureCheckbox from "@/components/PrefectureCheckboxes/PrefectureCheckbox";

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

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => server.close());

describe("PrefectureCheckboxes", () => {
  // エラーが出ずにレンダリングされることのみを確認
  it("loading", async () => {
    // rendering
    const toggleChecked = vi.fn((_data: PopulationCompositionResponse["result"] | undefined) => {});

    render(
      <QueryProvider>
        <PrefectureCheckbox prefecture={{ prefCode: 1, prefName: "test県" }} onChange={toggleChecked} />
      </QueryProvider>
    );
  });

  it("fetch success", async () => {
    // rendering
    const toggleChecked = vi.fn((_data: PopulationCompositionResponse["result"] | undefined) => {});

    const { getByRole } = render(
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
    const toggleChecked = vi.fn((_data: PopulationCompositionResponse["result"] | undefined) => {});

    const { getByRole } = render(
      <QueryProvider>
        <PrefectureCheckbox prefecture={{ prefCode: 1, prefName: "test県" }} onChange={toggleChecked} />
      </QueryProvider>
    );

    await waitFor(async () => {
      // action
      expect(getByRole("checkbox").attributes.getNamedItem("disabled")).toBeTruthy();
    });
  });
});
