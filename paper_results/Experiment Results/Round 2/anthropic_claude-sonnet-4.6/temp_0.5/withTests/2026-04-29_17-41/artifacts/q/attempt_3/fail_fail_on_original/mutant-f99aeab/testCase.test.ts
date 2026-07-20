import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import path from "path";

describe("captureLine", () => {
  it("filters Q internal frames from long stack traces", async () => {
    Q.longStackSupport = true;

    try {
      let capturedError: Error | null = null;

      await new Promise<void>((resolve) => {
        function myUserFunction() {
          return Q.defer().promise;
        }

        const d = Q.defer();
        
        myUserFunction().then(() => {}).fail((err: Error) => {
          capturedError = err;
          resolve();
        });

        d.reject(new Error("test"));
      });

      // Try a simpler chain
      capturedError = null;
      
      await new Promise<void>((resolve) => {
        Q().then(function step1() {
          return Q().then(function step2() {
            throw new Error("deep error");
          });
        }).fail(function(err: Error) {
          capturedError = err;
          resolve();
        });
      });

      expect(capturedError).not.toBeNull();
      const stack = (capturedError as Error).stack || "";
      
      // The stack should contain our user function names
      expect(stack).toContain("step1");
      expect(stack).toContain("step2");
      
      // With original: Q internal lines (from q.js between qStartingLine and qEndingLine)
      // are filtered. With mutation: they remain.
      // "flush" is a Q internal function that appears in Node.js async stacks.
      // But more reliably: the promise.stack captured in defer() contains Q internal frames.
      // After filtering, those should be gone. We check for "defer" from q.js internals
      // not appearing - but that's tricky since our code calls defer too.
      
      // Most reliable: check that lines containing "q.js" are not in the stack
      // (since Q internal frames from q.js should be filtered out)
      const lines = stack.split("\n");
      const qJsLines = lines.filter(line => 
        line.includes("q.js") && !line.includes("node_modules")
      );
      
      // With original code: Q internal frames filtered, so no q.js lines in stack
      // With mutated code: Q internal frames NOT filtered, q.js lines remain
      expect(qJsLines.length).toBe(0);
    } finally {
      Q.longStackSupport = false;
    }
  });
});