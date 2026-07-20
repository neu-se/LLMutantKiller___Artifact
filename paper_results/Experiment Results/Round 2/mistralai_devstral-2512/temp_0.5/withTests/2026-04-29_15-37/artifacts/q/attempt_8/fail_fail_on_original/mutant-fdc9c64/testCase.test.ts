// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_8/pending_category/mutant-fdc9c64/testCase.test.ts
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation test", () => {
  it("should show different stack trace filtering behavior", () => {
    // The mutation changes the condition from:
    // fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine
    // to:
    // fileName === qFileName && lineNumber >= qStartingLine || lineNumber <= qEndingLine

    // Create a deep promise chain to generate stack frames
    function createDeepChain(depth: number): Q.Promise<any> {
      if (depth === 0) {
        return Q.reject(new Error("Deep error"));
      }
      return Q.delay(1).then(() => createDeepChain(depth - 1));
    }

    // Create a chain deep enough to generate many stack frames
    return createDeepChain(10)
      .catch((error: Error) => {
        // Check the stack trace
        if (error.stack) {
          const stackLines = error.stack.split('\n');
          const qJsLines = stackLines.filter(line => line.includes('q.js'));

          // With original code: should filter most internal q.js frames
          // With mutated code: might keep more frames due to less strict filtering
          // The key difference is in how frames outside the line range are handled

          // Count lines that are likely outside the normal q.js range
          const extremeLines = qJsLines.filter(line => {
            const match = line.match(/q\.js:(\d+):/);
            return match && (parseInt(match[1]) < 10 || parseInt(match[1]) > 200);
          });

          // Original code should filter these extreme lines better
          // Mutated code might let some through due to the OR condition
          expect(extremeLines.length).toBeLessThan(3);
        }
        return Q.resolve();
      });
  });
});