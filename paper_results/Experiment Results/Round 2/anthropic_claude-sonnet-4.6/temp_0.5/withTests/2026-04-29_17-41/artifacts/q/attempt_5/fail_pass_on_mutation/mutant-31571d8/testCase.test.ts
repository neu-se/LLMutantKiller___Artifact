import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
  it("includes stacks from multiple promises in the source chain", (done) => {
    (Q as any).longStackSupport = true;

    // We need a chain where makeStackTraceLong walks at least 2 source-linked
    // promises that both have stacks. The original adds both; the mutated adds only 1.
    // 
    // When we do: Q().then(A).then(B).then(C) and C rejects,
    // the `self` in _rejected for the outermost .then handler is the promise
    // that has a source chain going back through multiple deferred promises.
    //
    // Use unique function names we can search for in the stack trace.

    function outerFunction() {
      const d = (Q as any).defer();
      
      // Create a chain: p1 -> p2 -> p3
      // p1 and p2 both get stacks (longStackSupport), p3 rejects
      const p1 = d.promise.then(function middleStep() {
        return (Q as any).reject(new Error("test error"));
      });
      
      // p1 now has source = the rejected promise
      // Attach another then to create another link in the chain
      const p2 = p1.then(function shouldNotRun() {
        return 42;
      });

      d.resolve();
      return p2;
    }

    outerFunction().fail(function(err: any) {
      try {
        (Q as any).longStackSupport = false;
        const stack: string = err.stack || "";
        // Count how many stacks were concatenated
        const separatorCount = (stack.match(/From previous event:/g) || []).length;
        // Original: walks source chain, adds stacks from multiple promises
        // Mutated: stops after first stack is added (false condition)
        // The original should produce at least 1 separator; verify the stack
        // contains middleStep which is in a promise earlier in the chain
        expect(stack).toContain("middleStep");
        expect(separatorCount).toBeGreaterThanOrEqual(1);
        done();
      } catch(e) {
        (Q as any).longStackSupport = false;
        done(e);
      }
    });
  });
});