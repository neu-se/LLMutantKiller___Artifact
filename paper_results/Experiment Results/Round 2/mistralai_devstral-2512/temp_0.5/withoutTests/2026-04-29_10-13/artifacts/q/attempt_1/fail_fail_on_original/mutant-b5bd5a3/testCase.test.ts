import { Q } from "./q";

describe("Promise valueOf behavior", () => {
  it("should correctly expose valueOf on fulfilled promises", () => {
    const fulfilledPromise = Q.resolve(42);
    expect(fulfilledPromise.valueOf()).toBe(42);
  });
});