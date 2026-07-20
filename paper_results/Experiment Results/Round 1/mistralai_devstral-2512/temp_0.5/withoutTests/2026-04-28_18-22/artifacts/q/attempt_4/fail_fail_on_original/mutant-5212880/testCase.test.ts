const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.done", () => {
  it("should return the promise when called with a promise and callbacks", () => {
    const promise = Q.resolve(42);
    const result = Q.done(promise, (value: number) => value, (error: Error) => error, (progress: any) => progress);
    expect(result).toBe(promise);
  });
});