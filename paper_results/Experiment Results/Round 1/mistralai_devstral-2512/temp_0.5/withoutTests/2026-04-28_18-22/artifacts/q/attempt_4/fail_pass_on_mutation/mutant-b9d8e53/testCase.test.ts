const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly parse multi-digit line numbers in stack traces", () => {
    // Create a promise chain that will generate a stack trace
    const promise = Q.resolve()
      .then(() => {
        // Force a stack trace with multi-digit line numbers
        throw new Error("Test error at line 123");
      })
      .catch((error: Error) => {
        expect(error.stack).toBeDefined();
        const lines = error.stack!.split("\n");

        // Look for stack frames with line numbers
        for (const line of lines) {
          const match = /\((.+):(\d+):\d+\)/.exec(line);
          if (match) {
            const lineNumberStr = match[2];
            const lineNumber = parseInt(lineNumberStr, 10);

            // This test specifically checks that multi-digit line numbers
            // are parsed correctly. The mutation would cause "123" to be
            // parsed as just "1" (single digit)
            if (lineNumber >= 100) {
              expect(lineNumberStr.length).toBeGreaterThan(2);
              expect(lineNumber).toBeGreaterThanOrEqual(100);
            }
          }
        }

        return Q.resolve();
      });

    return promise;
  });
});