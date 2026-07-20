import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done", () => {
  it("should return a promise when called with a fulfilled promise", () => {
    const promise = Q.resolve(42);
    const result = Q.done(promise);
    expect(result).toBeDefined();
    expect(typeof result.then).toBe("function");
  });
});