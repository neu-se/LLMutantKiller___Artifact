import { Q } from "./q.js";

describe("Promise.prototype.toString", () => {
  it("should return the correct string representation", () => {
    const promise = Q.resolve(42);
    expect(promise.toString()).toBe("[object Promise]");
  });
});