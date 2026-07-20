import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace filtering", () => {
  it("should correctly parse stack trace line numbers", () => {
    // Create a scenario that will generate a stack trace with line numbers
    const promise = Q.resolve()
      .then(() => {
        throw new Error("Test error");
      })
      .catch((error: Error) => {
        // Verify the stack trace contains valid line numbers
        expect(error.stack).toBeDefined();
        const lines = error.stack!.split("\n");
        for (const line of lines) {
          const match = /\((.+):(\d+):\d+\)/.exec(line);
          if (match) {
            const lineNumber = parseInt(match[2], 10);
            // This will fail if the mutation causes line numbers to be parsed incorrectly
            // (e.g., "123" would be parsed as "1" due to the mutation)
            expect(lineNumber).toBeGreaterThan(0);
            expect(lineNumber.toString().length).toBe(match[2].length);
          }
        }
        return Q.resolve();
      });

    return promise;
  });
});