const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should filter internal Q frames from error stacks", () => {
    // Enable long stack traces to ensure internal frames are generated
    Q.longStackSupport = true;

    // Create a promise chain that will generate internal stack frames
    const error = new Error("test error");
    const promise = Q.reject(error);

    return promise
      .catch((e: any) => {
        const stack = e.stack;
        expect(stack).toBeDefined();

        // Count lines that contain "q.js" and are within the Q library's line range
        // The mutation changes the filtering condition from checking line numbers to always true
        const qLines = stack.split('\n').filter((line: string) =>
          line.includes('q.js') && line.match(/q\.js:(\d+):\d+/)
        );

        // In original code, internal frames should be filtered out
        // In mutated code (with true &&), all q.js frames remain
        // Original should have minimal q.js frames, mutated will have many
        expect(qLines.length).toBeLessThan(3);

        // Verify error message is preserved
        expect(e.message).toBe("test error");
        return Q.resolve();
      });
  });
});