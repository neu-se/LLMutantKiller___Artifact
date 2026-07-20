const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q Promise valueOf behavior", () => {
  it("should return the fulfilled value when state is fulfilled", () => {
    const promise = Q.resolve(42);
    expect(promise.valueOf()).toBe(42);
  });
});