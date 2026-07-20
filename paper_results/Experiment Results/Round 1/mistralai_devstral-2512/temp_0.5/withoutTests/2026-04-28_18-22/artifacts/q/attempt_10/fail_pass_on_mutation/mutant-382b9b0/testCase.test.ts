import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nodeify", () => {
  it("should return the promise instance when no callback is provided", () => {
    const promise = Q.resolve("test");
    const result = promise.nodeify();
    expect(result).toBe(promise);
  });
});