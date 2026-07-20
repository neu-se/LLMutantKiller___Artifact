import { Q } from "./q.js";

describe("Q.denodeify", () => {
  it("should handle undefined callback by returning a function", () => {
    const result = Q.denodeify(undefined);
    expect(typeof result).toBe("function");
  });
});