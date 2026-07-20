import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done", () => {
  it("should return a promise when called", () => {
    const promise = Q.resolve(42);
    const result = Q.done(promise, () => {}, () => {}, () => {});
    expect(result).toBe(promise);
  });
});