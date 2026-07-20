import { Q } from "./q";

describe("Q.finally", () => {
  it("should reject when callback is not a function", () => {
    const promise = Q.resolve(42);
    const invalidCallback = {}; // Object without apply method

    expect(() => {
      promise.finally(invalidCallback as any);
    }).toThrow("Q can't apply finally callback");
  });
});