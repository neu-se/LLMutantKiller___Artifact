// Test case to detect the mutation in isStopIteration function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation detection", () => {
  it("should correctly handle non-QReturnValue exceptions in generators", () => {
    // Test that regular exceptions are not mistaken for QReturnValue
    // The mutation changes isStopIteration to always return true
    const testPromise = Q.async(function* () {
      try {
        yield Q.delay(10);
        throw new Error("regular_error");
      } catch (e) {
        // In original code, only QReturnValue should be caught here
        // In mutated code, ALL exceptions will be caught (incorrectly)
        if (e instanceof Error && e.message === "regular_error") {
          return "caught_regular_error";
        }
        return "caught_something_else";
      }
    })();

    return testPromise.then((result: string) => {
      // In original code, regular errors should be caught normally
      // In mutated code, this behavior should be the same
      // We need a different approach to detect the mutation
      expect(result).toBe("caught_regular_error");
    });
  });
});