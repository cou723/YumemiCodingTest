// @vitest-environment jsdom
import PrefectureCheckboxes from "@/components/PrefectureCheckboxes";
import { describe } from "node:test";
import { afterAll, afterEach, beforeAll, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { cleanup, render, waitFor } from "@testing-library/react";
import { PopulationCompositionResponse } from "@/types/populationCompositionResponse";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { handlers } from "../../mocks/handlers";
import { PopulationComposition } from "@/types/populationCompositions";

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

describe("PrefectureCheckboxeses", () => {
  it("empty", async () => {
    // エラーが出ずにレンダリングされることのみを確認
    render(
      <QueryProvider>
        <PrefectureCheckboxes isLoading={false} onChange={(_data: PopulationComposition[]) => {}} />
      </QueryProvider>
    );
  });

  it("with data", async () => {
    // rendering
    const toggleChecked = vi.fn((_data: PopulationComposition[]) => {});

    const { getAllByRole } = render(
      <QueryProvider>
        <PrefectureCheckboxes
          prefectures={[
            { prefCode: 1, prefName: "test1県" },
            { prefCode: 2, prefName: "test2県" },
            { prefCode: 3, prefName: "test3県" },
          ]}
          onChange={toggleChecked}
          isLoading={false}
        />
      </QueryProvider>
    );

    await waitFor(async () => {
      // action
      const user = userEvent.setup();
      const checkboxes = getAllByRole("checkbox");
      {
        const calledArgs: PopulationComposition[] = [
          {
            label: { prefCode: 1, prefName: "test1県" },
            data: { data: [], boundaryYear: 2020 },
          },
        ];
        await user.click(checkboxes[0]);
        expect(toggleChecked).toHaveBeenCalledWith(calledArgs);
      }

      {
        const calledArgs: PopulationComposition[] = [
          {
            label: { prefCode: 2, prefName: "test2県" },
            data: { data: [], boundaryYear: 2020 },
          },
        ];
        await user.click(checkboxes[1]);
        expect(toggleChecked).toHaveBeenCalledWith(calledArgs);
      }

      {
        const calledArgs: PopulationComposition[] = [
          {
            label: { prefCode: 3, prefName: "test3県" },
            data: { data: [], boundaryYear: 2020 },
          },
        ];
        await user.click(checkboxes[2]);

        expect(toggleChecked).toHaveBeenCalledWith(calledArgs);
      }
    });
  });

  it("loading", async () => {
    // rendering
    const toggleChecked = vi.fn((_data: PopulationComposition[]) => {});

    const { getByRole } = render(
      <QueryProvider>
        <PrefectureCheckboxes isLoading={true} onChange={toggleChecked} />
      </QueryProvider>
    );

    await waitFor(() => {
      // action
      getByRole("progressbar");
    });
  });
});
