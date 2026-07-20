import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString in long stack traces", () => {
  it("produces a non-empty stack trace when long stack support is enabled", async () => {
    Q.longStackSupport = true;

    try {
      let capturedError: any = null;

      // We need the promise chain to go through _rejected which calls makeStackTraceLong
      // This requires: a rejection that is caught by a .then(fulfilled, rejected) handler
      await new Promise<void>((resolve) => {
        const d = Q.defer();
        d.reject(new Error("test error"));
        
        // Chain through then so makeStackTraceLong is called in _rejected
        d.promise
          .then(
            null,
            function(err: any) {
              capturedError = err;
              resolve();
            }
          );
      });

      expect(capturedError).not.toBeNull();
      const stack: string = capturedError.stack;
      
      // With original: filterStackString keeps non-internal, non-node frames -> non-empty
      // With mutation: filterStackString keeps only node frames (module.js/node.js) 
      //   -> empty string in modern Node.js
      // After makeStackTraceLong assigns empty string to error.stack via object_defineProperty,
      // the stack becomes ""
      expect(typeof stack).toBe("string");
      expect(stack.length).toBeGreaterThan(0);
    } finally {
      Q.longStackSupport = false;
    }
  });
});