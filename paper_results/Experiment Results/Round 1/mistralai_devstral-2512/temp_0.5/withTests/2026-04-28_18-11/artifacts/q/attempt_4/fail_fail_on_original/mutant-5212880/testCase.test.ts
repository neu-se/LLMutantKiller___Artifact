import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done", () => {
  it("should return a promise when called with all four arguments", () => {
    const promise = Q.resolve(42);
    const result = Q.done(promise, (value: number) => value, (error: Error) => error, (progress: any) => progress);
    expect(result).toBeDefined();
    expect(typeof result.then).toBe("function");
  });
});