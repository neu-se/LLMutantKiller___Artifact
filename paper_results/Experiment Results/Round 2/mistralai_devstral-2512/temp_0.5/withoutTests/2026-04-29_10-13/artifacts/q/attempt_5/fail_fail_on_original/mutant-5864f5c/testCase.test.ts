// Test case to detect the mutation in the isStopIteration function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation", () => {
  it("should correctly handle StopIteration in generator functions", () => {
    // Create a mock StopIteration exception
    const stopIteration = { toString: () => "[object StopIteration]" };

    // Test with Q.async which uses isStopIteration internally
    const testWithStopIteration = Q.async(function* () {
      throw stopIteration;
    });

    // The test should resolve with the StopIteration value in original code
    // but reject in mutated code due to the inverted condition
    return Q(testWithStopIteration).then(
      (value) => {
        // In original code, this should be called with the StopIteration value
        expect(value).toBe(stopIteration);
      },
      (reason) => {
        // In mutated code, this should be called
        throw new Error("Should not reject in original code");
      }
    );
  });
});