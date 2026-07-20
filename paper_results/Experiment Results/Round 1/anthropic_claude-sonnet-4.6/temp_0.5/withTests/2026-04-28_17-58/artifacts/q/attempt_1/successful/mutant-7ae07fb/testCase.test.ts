import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.promise resolver error message", () => {
  it("should throw a TypeError with 'resolver must be a function.' message when a non-function is passed", () => {
    let thrownError: Error | null = null;
    try {
      Q.promise(null as any);
    } catch (e) {
      thrownError = e as Error;
    }
    expect(thrownError).not.toBeNull();
    expect(thrownError).toBeInstanceOf(TypeError);
    expect(thrownError!.message).toBe("resolver must be a function.");
  });
});