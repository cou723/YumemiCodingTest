/* eslint-disable @typescript-eslint/no-floating-promises */
// @vitest-environment jsdom
import React, { ReactNode } from "react";

import { describe } from "node:test";

import { cleanup, getByText, render, waitFor } from "@testing-library/react";
import { afterEach, it, vi } from "vitest";

import Header from "@/components/Header";
import { PopulationCompositionResponse } from "@/types/populationCompositionResponse";

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
