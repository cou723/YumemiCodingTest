import { describe, expect, it } from "vitest";

import { extractPopulationCompositionsLabel } from "./extractPopulationCompositionsLabel";

describe("extractPopulationCompositionsLabel", () => {
  it("empty", () => {
    expect(extractPopulationCompositionsLabel([])).toEqual([]);
  });

  it("single", () => {
    expect(
      extractPopulationCompositionsLabel([
        {
          label: { prefCode: 1, prefName: "北海道" },
          data: { boundaryYear: 1, data: [{ label: "labelA", data: [{ year: 1, value: 1 }] }] },
        },
      ])
    ).toEqual(["labelA"]);
  });

  it("multiple prefecture label", () => {
    expect(
      extractPopulationCompositionsLabel([
        {
          label: { prefCode: 1, prefName: "北海道" },
          data: {
            boundaryYear: 1,
            data: [{ label: "labelA", data: [{ year: 1, value: 1 }] }],
          },
        },
        {
          label: { prefCode: 2, prefName: "青森県" },
          data: {
            boundaryYear: 1,
            data: [{ label: "labelB", data: [{ year: 1, value: 1 }] }],
          },
        },
      ])
    ).toEqual(["labelA", "labelB"]);
  });

  it("multiple label in a prefecture", () => {
    expect(
      extractPopulationCompositionsLabel([
        {
          label: { prefCode: 1, prefName: "北海道" },
          data: {
            boundaryYear: 1,
            data: [
              { label: "labelA", data: [{ year: 1, value: 1 }] },
              { label: "labelB", data: [{ year: 1, value: 1 }] },
            ],
          },
        },
      ])
    ).toEqual(["labelA", "labelB"]);
  });

  it("duplicated label", () => {
    expect(
      extractPopulationCompositionsLabel([
        {
          label: { prefCode: 1, prefName: "北海道" },
          data: {
            boundaryYear: 1,
            data: [{ label: "labelA", data: [{ year: 1, value: 1 }] }],
          },
        },
        {
          label: { prefCode: 2, prefName: "青森県" },
          data: {
            boundaryYear: 1,
            data: [{ label: "labelA", data: [{ year: 1, value: 1 }] }],
          },
        },
      ])
    ).toEqual(["labelA"]);
  });
});
