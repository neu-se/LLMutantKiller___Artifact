// Test case to detect the mutation in isStopIteration function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation detection", () => {
  it("should correctly handle generator completion with Q.return()", () => {
    // Test that Q.return() properly terminates generator execution
    // The mutation affects how QReturnValue exceptions are detected
    let executionReachedEnd = false;

    const testPromise = Q.async(function* () {
      try {
        yield Q.delay(10);
        Q["return"]("early_exit");
        executionReachedEnd = true; // Should not reach here
        return "unreachable";
      } catch (e) {
        // In original code, QReturnValue should be caught here
        // In mutated code, this might not work correctly
        if (e && e.value === "early_exit") {
          return "caught_return";
        }
        throw e;
      }
    })();

    return testPromise.then((result: string) => {
      // In original code, Q.return() should cause early exit
      // In mutated code, execution might continue past Q.return()
      expect(result).toBe("caught_return");
      expect(executionReachedEnd).toBe(false);
    });
  });
});