import * as complexModule from "./complex.js";

describe("Complex", () => {
  it("should have the correct ES module definition", () => {
    expect(complexModule.__esModule).toBe(true);
    expect(Object.keys(complexModule)).not.toHaveLength(0);
  });
});