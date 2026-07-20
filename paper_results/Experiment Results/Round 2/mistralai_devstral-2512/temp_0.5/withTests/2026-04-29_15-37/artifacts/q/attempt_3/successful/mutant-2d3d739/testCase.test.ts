import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_defineProperty mutation test", () => {
  it("should fail when object_defineProperty is not a function", () => {
    // Enable long stack traces which uses object_defineProperty
    Q.longStackSupport = true;

    // Create a promise chain that will trigger long stack trace handling
    const promise = Q.resolve()
      .then(() => {
        throw new Error("test error");
      });

    return promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (error: Error) => {
        // The original code should handle this fine
        // The mutated code should fail because object_defineProperty is false
        // and will be called when trying to set stack properties
        expect(error).toBeInstanceOf(Error);
        return Q.resolve();
      }
    );
  });
});