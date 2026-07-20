import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString via long stack traces", () => {
  it("should filter out internal Q frames from long stack traces when longStackSupport is enabled", async () => {
    Q.longStackSupport = true;

    try {
      const error = await Q.reject(new Error("test rejection"))
        .then(() => {
          // This should not be called
        })
        .catch((err: Error) => {
          return err;
        });

      // The stack trace should not contain references to q.js internal lines
      // With the original code: internal frames are filtered out (both conditions must be true)
      // With the mutated code: internal frames are included (OR logic allows internal frames through)
      const stack = error.stack || "";

      // Count occurrences of q.js in the stack - with the mutation, there will be
      // many more q.js internal frames included
      const qFrameMatches = (stack.match(/q\.js/g) || []).length;

      // With the original code, internal Q frames are filtered, so q.js should appear
      // minimally or not at all in the filtered stack.
      // With the mutated code, internal frames pass through because:
      // !isInternalFrame(line) || !isNodeFrame(line) && line
      // For an internal Q frame: isInternalFrame = true, isNodeFrame = false
      // Original: !true && !false && line = false (filtered out)
      // Mutated: !true || (!false && line) = false || true = true (included!)
      // So with mutation, internal Q frames appear in the stack
      expect(qFrameMatches).toBeLessThan(5);
    } finally {
      Q.longStackSupport = false;
    }
  });
});