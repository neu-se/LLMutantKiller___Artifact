import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.toString", () => {
  it("should return '[object Promise]' when a promise is converted to string", () => {
    const promise = Q(42);
    expect(promise.toString()).toBe("[object Promise]");
  });
});