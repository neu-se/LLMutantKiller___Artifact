import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_defineProperty mutation test", () => {
  it("should correctly use Object.defineProperty for long stack traces", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    const error = new Error("test error");
    const promise = Q.reject(error);

    return promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (caughtError: Error) => {
        // In the original code, object_defineProperty should be a function
        // that can define properties on the error object
        // In the mutated code, it's set to false which should cause a TypeError
        // when Q tries to use it for long stack traces
        expect(caughtError).toBeInstanceOf(Error);
        expect(caughtError.message).toBe("test error");
        return Q.resolve();
      }
    );
  });
});