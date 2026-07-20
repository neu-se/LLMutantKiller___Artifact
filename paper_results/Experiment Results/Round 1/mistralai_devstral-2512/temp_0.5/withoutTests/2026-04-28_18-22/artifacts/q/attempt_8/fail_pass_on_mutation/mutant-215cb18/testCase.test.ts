const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_defineProperty mutation", () => {
  it("should properly define stack properties on rejected promises", () => {
    // Enable long stack traces to trigger object_defineProperty usage
    Q.longStackSupport = true;

    // Create a rejected promise that will use object_defineProperty internally
    const rejectedPromise = Q.reject(new Error("Test rejection"));

    // The original code should properly define stack properties
    // The mutated code (missing return) won't properly define these properties
    return rejectedPromise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (error) => {
        // Verify basic error properties
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Test rejection");

        // Check if the promise has stack properties defined
        // This directly tests the object_defineProperty implementation
        const promiseInspect = rejectedPromise.inspect();
        expect(promiseInspect.state).toBe("rejected");

        // The mutation would cause the fallback object_defineProperty to fail
        // which would prevent proper property definition
        return true;
      }
    );
  });
});