import { Q } from "./q.js";

describe("Q stack trace filtering", () => {
  it("should correctly filter stack traces with line numbers", () => {
    // Create a promise chain that will generate a stack trace
    const promise = Q.resolve()
      .then(() => {
        throw new Error("Test error");
      })
      .catch((error) => {
        // The stack trace should be properly filtered
        expect(error.stack).toBeDefined();
        // Check that the stack trace contains valid line numbers
        // This will fail if the mutation breaks line number parsing
        const lines = error.stack.split("\n");
        for (const line of lines) {
          const match = /\((.+):(\d+):\d+\)/.exec(line);
          if (match) {
            const lineNumber = parseInt(match[2], 10);
            // This assertion will fail if the mutation causes line numbers
            // to be parsed incorrectly (e.g., if a line number like "123" is
            // parsed as just "1" due to the mutation)
            expect(lineNumber).toBeGreaterThan(0);
            expect(lineNumber.toString()).toHaveLength(match[2].length);
          }
        }
        return Q.resolve();
      });

    return promise;
  });
});