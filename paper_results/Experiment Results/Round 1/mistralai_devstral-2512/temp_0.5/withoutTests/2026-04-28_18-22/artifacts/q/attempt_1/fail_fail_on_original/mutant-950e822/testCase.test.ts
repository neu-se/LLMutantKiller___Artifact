import { Q } from "./q";

describe("Promise toString mutation", () => {
  it("should return the correct string representation of a promise", () => {
    const promise = Q.resolve(42);
    expect(promise.toString()).toBe("[object Promise]");
  });
});