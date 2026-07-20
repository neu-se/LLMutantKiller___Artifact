import { Q } from "./q";

describe("Q.nearer", () => {
  it("should return the fulfillment value when the promise is fulfilled", () => {
    const fulfilledPromise = Q.resolve(42);
    const result = Q.nearer(fulfilledPromise);
    expect(result).toBe(42);
  });
});