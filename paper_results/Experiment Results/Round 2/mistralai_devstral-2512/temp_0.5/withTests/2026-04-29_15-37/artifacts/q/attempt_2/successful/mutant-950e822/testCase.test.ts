const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.toString", () => {
  it("should return '[object Promise]' when called on a promise instance", () => {
    const promise = Q.resolve(42);
    expect(promise.toString()).toBe("[object Promise]");
  });
});