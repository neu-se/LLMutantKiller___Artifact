// Test case to detect the mutation in isStopIteration function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation detection", () => {
  it("should correctly handle generator return values", () => {
    // Test the behavior of Q.async with generator functions
    // The mutation affects how StopIteration exceptions are detected
    const testPromise = Q.async(function* () {
      yield Q.delay(10);
      return "success";
    })();

    return testPromise.then((result: string) => {
      // This test verifies that the generator completes successfully
      // The mutation would cause incorrect handling of generator completion
      expect(result).toBe("success");
    });
  });
});