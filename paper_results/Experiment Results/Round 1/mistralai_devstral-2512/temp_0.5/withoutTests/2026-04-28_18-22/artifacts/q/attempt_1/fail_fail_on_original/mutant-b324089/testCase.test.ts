import { Q } from "./q.js";

describe("Q.nearer function", () => {
  it("should return the fulfillment value when the promise is fulfilled", async () => {
    const fulfilledPromise = Q.resolve(42);
    const result = Q.nearer(fulfilledPromise);
    expect(result).toBe(42);
  });
});