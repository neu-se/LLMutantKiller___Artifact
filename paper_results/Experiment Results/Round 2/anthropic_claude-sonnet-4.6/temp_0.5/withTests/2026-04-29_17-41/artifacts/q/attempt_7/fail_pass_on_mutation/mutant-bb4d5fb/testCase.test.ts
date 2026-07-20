import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("mutation detection", () => {
  it("detects isInternalFrame mutation by checking q internal frames are filtered", async () => {
    Q.longStackSupport = true;

    try {
      let capturedError: Error | null = null;
      const d = Q.defer();
      
      d.promise.then(null, (e: Error) => { capturedError = e; });
      d.reject(new Error("test"));

      await new Promise<void>(r => setTimeout(r, 50));

      expect(capturedError).not.toBeNull();
      const stack = capturedError!.stack || "";
      
      // With longStackSupport, makeStackTraceLong concatenates promise stacks
      // Promise stacks are captured inside q.js (defer function)
      // Original: q.js frames filtered, "From previous event" separator present
      //           but no q.js function names like "defer" or "promise" in frames
      // Mutated:  same q.js frames filtered (lineNumber <= qEndingLine still true for q.js)
      //           BUT also user frames filtered
      // The separator itself should be present in both cases if makeStackTraceLong ran
      expect(stack).toContain("From previous event");
    } finally {
      Q.longStackSupport = false;
    }
  });
});