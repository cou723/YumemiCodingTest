import { describe, expect, it } from "vitest";

import { hello } from "./hello";

describe("hello", () => {
  it("should return a greeting message", () => {
    const result = hello();
    expect(result).toBe("hello");
  });
});
