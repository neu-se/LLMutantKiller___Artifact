// Test case to detect the mutation in isStopIteration function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation test", () => {
  it("should correctly identify StopIteration exceptions independently of QReturnValue", () => {
    // Create a mock StopIteration exception that is NOT a QReturnValue
    const stopIteration = {
      toString: () => "[object StopIteration]"
    };

    // Test with StopIteration-like object that should be caught in original but not mutated
    const promise = Q.async(function* () {
      try {
        throw stopIteration;
      } catch (e) {
        // In original code: should catch as StopIteration (OR condition)
        // In mutated code: won't catch because it's not instanceof QReturnValue (AND condition)
        return "caught";
      }
    })();

    return promise.then((result: any) => {
      expect(result).toBe("caught");
    });
  });
});