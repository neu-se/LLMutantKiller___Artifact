import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering behavior", () => {
  it("should correctly filter stack traces with mixed frame types", () => {
    // Access Q through the module's default export
    const Q = (qModule as any).default || qModule;

    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate internal stack frames
    const promise = Q.Promise((resolve, reject) => {
      // Create a nested promise to generate more internal frames
      Q.Promise((innerResolve, innerReject) => {
        setTimeout(() => {
          const error = new Error("Test error");
          // Manually add some stack frames that should be filtered
          error.stack = [
            "Error: Test error",
            "    at userCode (test.js:10:15)",
            "    at internalQFunction (q.js:100:20)",
            "    at Module._compile (module.js:456:26)",
            "    at moreUserCode (test.js:20:30)"
          ].join("\n");
          innerReject(error);
        }, 0);
      }).then(null, (err) => {
        reject(err);
      });
    });

    return promise
      .catch((err: Error) => {
        const stack = err.stack || "";
        const lines = stack.split('\n');

        // Count lines that contain internal Q frames or node frames
        let internalOrNodeFrames = 0;
        for (const line of lines) {
          if (line.includes("(q.js:") || line.includes("(module.js:") || line.includes("(node.js:")) {
            internalOrNodeFrames++;
          }
        }

        // Original code should filter out all internal and node frames
        // Mutated code will keep some due to the OR condition
        expect(internalOrNodeFrames).toBe(0);

        // Restore original setting
        Q.longStackSupport = false;
      });
  });
});