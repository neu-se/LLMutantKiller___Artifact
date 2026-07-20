import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame filtering in long stack traces", () => {
  it("should filter out node.js internal frames from long stack traces when longStackSupport is enabled", async () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      // Create a rejection with a custom error that has a stack containing a node.js internal frame
      const deferred = Q.defer();
      
      // We need to create an error whose stack trace includes a "(node.js:" line
      // and verify it gets filtered out in the long stack trace
      const error = new Error("test error");
      // Manually craft a stack that includes a node.js internal frame
      const fakeNodeFrame = "    at Module._compile (node.js:456:26)";
      const normalFrame = "    at myFunction (/app/myfile.js:10:5)";
      error.stack = `Error: test error\n${normalFrame}\n${fakeNodeFrame}`;

      let capturedError: any = null;
      
      const promise = deferred.promise.then(null, function(err) {
        capturedError = err;
        return null; // handle the rejection
      });

      deferred.reject(error);

      await promise;

      // With original code: isNodeFrame returns true for lines with "(node.js:"
      // so those lines are filtered OUT from the stack trace
      // With mutated code: isNodeFrame always returns false, so those lines remain
      
      // The stack should have been filtered - node.js internal frames should be removed
      // capturedError.stack should not contain the node.js internal frame
      // (makeStackTraceLong is called during rejection handling)
      
      // Actually, let's test filterStackString indirectly by checking that
      // a promise chain with long stack support properly filters node.js frames
      
      // Create a scenario where we can observe the filtering behavior
      const deferred2 = Q.defer();
      let resolvedStack: string | undefined;
      
      const p = Q(null).then(function() {
        return deferred2.promise;
      }).then(null, function(err: any) {
        resolvedStack = err.stack;
        return null;
      });

      const err2 = new Error("test");
      // Inject a fake node.js frame into the stack
      err2.stack = `Error: test\n    at realFunction (/real/file.js:1:1)\n    at Module._compile (node.js:999:10)\n    at anotherReal (/another/file.js:2:2)`;
      
      deferred2.reject(err2);
      
      await p;
      
      if (resolvedStack !== undefined) {
        // Original: "(node.js:" lines are filtered out
        // Mutated: "(node.js:" lines remain
        const hasNodeJsFrame = resolvedStack.includes("(node.js:");
        expect(hasNodeJsFrame).toBe(false);
      }
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});