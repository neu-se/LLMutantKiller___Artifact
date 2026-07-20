// Test case to detect the mutation in isStopIteration function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation test", () => {
  it("should correctly identify StopIteration exceptions", () => {
    // Create a mock StopIteration exception
    const stopIteration = {
      toString: () => "[object StopIteration]"
    };

    // Create a QReturnValue instance
    const QReturnValue = function(value: any) {
      this.value = value;
    };
    const qReturnValue = new QReturnValue("test value");

    // Test with StopIteration-like object (should be treated as StopIteration)
    const promise1 = Q.async(function* () {
      try {
        throw stopIteration;
      } catch (e) {
        // In the original code, this should be caught as StopIteration
        // In the mutated code, it won't be caught because it's not instanceof QReturnValue
        return "caught";
      }
    })();

    // Test with QReturnValue (should be treated as return value in both versions)
    const promise2 = Q.async(function* () {
      try {
        throw qReturnValue;
      } catch (e) {
        return "caught";
      }
    })();

    return Promise.all([
      promise1.then((result: any) => {
        expect(result).toBe("caught");
      }),
      promise2.then((result: any) => {
        expect(result).toBe("caught");
      })
    ]);
  });
});