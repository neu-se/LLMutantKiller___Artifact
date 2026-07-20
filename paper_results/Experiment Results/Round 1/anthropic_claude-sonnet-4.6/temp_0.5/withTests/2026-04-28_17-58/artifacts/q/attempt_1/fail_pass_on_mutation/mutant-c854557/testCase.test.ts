import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack trace filtering", () => {
  it("should filter Q internal frames from long stack traces when line numbers are multi-digit", async () => {
    Q.longStackSupport = true;

    try {
      const result = await new Promise<string>((resolve, reject) => {
        Q.reject(new Error("test error"))
          .then(() => {
            // fulfilled handler - should not be called
          })
          .fail((err: Error) => {
            resolve(err.stack || "");
          });
      });

      // The stack trace should not contain references to q.js internal lines
      // With the original regex (matching multi-digit line numbers), Q filters its own frames
      // With the mutated regex (only single-digit line numbers), Q cannot identify its own frames
      // and they leak into the stack trace
      const stackLines = result.split("\n");
      
      // Filter out lines that reference q.js internals (lines with multi-digit line numbers)
      // In the original, these are filtered; in the mutant, they appear in the stack
      const qInternalLines = stackLines.filter(line => 
        line.includes("q.js:") && /q\.js:\d{2,}/.test(line)
      );
      
      // With original code, Q filters its own internal frames, so there should be no q.js lines
      // with multi-digit line numbers in the filtered stack
      expect(qInternalLines.length).toBe(0);
    } finally {
      Q.longStackSupport = false;
    }
  });
});