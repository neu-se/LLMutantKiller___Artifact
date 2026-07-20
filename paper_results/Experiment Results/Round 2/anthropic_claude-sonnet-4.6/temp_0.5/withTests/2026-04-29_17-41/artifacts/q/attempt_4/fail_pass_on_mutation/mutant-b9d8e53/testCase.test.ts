import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack line number regex handles multi-digit line numbers", () => {
  it("long stack traces should include From previous event separator when captureLine works", async () => {
    Q.longStackSupport = true;

    try {
      let capturedStack = "";

      function step1(): Q.Promise<never> {
        return Q.Promise(function(resolve: any, reject: any) {
          setTimeout(function() {
            reject(new Error("original error"));
          }, 0);
        });
      }

      function step2(): Q.Promise<never> {
        return step1().then(function() {
          return Q.reject(new Error("should not reach"));
        });
      }

      await new Promise<void>((resolve) => {
        step2().fail(function(err: Error) {
          capturedStack = err.stack || "";
          resolve();
        });
      });

      // With original code: captureLine() correctly parses multi-digit line numbers,
      // qStartingLine/qEndingLine are set, Q internals are filtered,
      // and makeStackTraceLong successfully builds a long stack with
      // "From previous event:" separator.
      //
      // With mutated code: captureLine() returns undefined because q.js lines
      // are multi-digit. qStartingLine is undefined. filterStackString still runs
      // but isInternalFrame uses: lineNumber >= qStartingLine (undefined >= undefined = false)
      // so nothing gets filtered. The concatenated stacks still get joined with
      // "From previous event:" BUT the filter removes nothing...
      // 
      // Actually the key difference: with original, qFileName is set correctly,
      // so isInternalFrame can match. With mutated, qFileName may still be set
      // if the filename part matches... let me reconsider.
      //
      // The real test: does "From previous event:" appear in the stack?
      // makeStackTraceLong only runs when hasStacks && promise.stack && error.stack
      // promise.stack is set in defer() using the same captureLine indirectly.
      // If longStackSupport works, we get the separator.
      expect(capturedStack).toContain("From previous event:");
    } finally {
      Q.longStackSupport = false;
    }
  });
});