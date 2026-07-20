import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nodeify", () => {
  it("should return the promise when nodeback is not provided", () => {
    const promise = Q.resolve("test");
    const result = promise.nodeify();
    expect(result).toBe(promise);
  });
});