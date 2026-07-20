// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_10/pending_category/mutant-fdc9c64/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isInternalFrame mutation test", () => {
  it("should show different behavior in promise error handling", () => {
    // The mutation changes how stack frames are filtered, which affects error handling
    // Create a scenario that will expose this difference

    let errorCaught = false;
    const testError = new Error("Test error");

    // Create a promise chain that will generate stack frames
    return Q.Promise((resolve: any, reject: any) => {
      // Use setTimeout to create async stack frames
      setTimeout(() => {
        try {
          // Throw error from within promise
          throw testError;
        } catch (e) {
          reject(e);
        }
      }, 1);
    }).catch((e: Error) => {
      errorCaught = true;
      // Check if the error stack contains expected patterns
      if (e.stack) {
        // Count q.js frames in the stack
        const qFrames = e.stack.split('\n').filter(line => line.includes('q.js'));

        // Original code should filter internal frames better
        // Mutated code might include more frames due to less strict filtering
        // The key difference is in how boundary line numbers are handled

        // Look for frames that would be affected by the mutation
        const boundaryFrames = qFrames.filter(line => {
          const match = line.match(/q\.js:(\d+):/);
          return match && (parseInt(match[1]) <= 10 || parseInt(match[1]) >= 200);
        });

        // Original should have fewer boundary frames
        // Mutated might have more due to OR condition
        expect(boundaryFrames.length).toBeLessThan(2);
      }
      return Q();
    }).then(() => {
      expect(errorCaught).toBe(true);
    });
  });
});