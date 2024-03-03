// @vitest-environment jsdom
import { describe } from "node:test";
import { afterEach, it, vi } from "vitest";
import { cleanup, getByText, render, waitFor } from "@testing-library/react";
import { PopulationCompositionResponse } from "@/types/populationCompositionResponse";
import React, { ReactNode } from "react";
import Header from "@/components/Header";

afterEach(() => {
  cleanup();
});

describe("Header", () => {
  it("loading", async () => {
    // rendering
    const { getByText } = render(<Header />);

    // assertion
    getByText("Yumemi Coding Test");
  });
});
