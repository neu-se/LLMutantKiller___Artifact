const q = require("../../../../../../../../../subject_repositories/q/q.js");

describe("q", () => {
  it("should create a promise", () => {
    // Create a promise
    const promise = q(10);

    // Check if the promise is fulfilled
    expect(promise.isFulfilled()).toBe(true);
  });
});