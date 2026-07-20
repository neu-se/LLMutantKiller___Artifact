const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("nodeify behavior", () => {
  it("should return the promise when nodeback is not provided", () => {
    const promise = Q(42);
    const result = promise.nodeify();
    expect(result).toBe(promise);
  });
});