import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
  it("should include stacks from promises earlier in the chain when error is rethrown through catch handlers", (done) => {
    const originalLongStackSupport = (Q as any).longStackSupport;
    (Q as any).longStackSupport = true;

    // Create a chain where the error is caught and rethrown multiple times.
    // Each rethrow triggers makeStackTraceLong again. On the second+ call,
    // __minimumStackCounter__ is already set on the error object.
    // Original: still adds stacks where p.stackCounter < error.__minimumStackCounter__
    // Mutated: skips all stacks once __minimumStackCounter__ is set (uses `false`)
    // This means the original produces more "From previous event:" separators.

    function step1() {
      return Q.reject(new Error("original error"));
    }

    function step2() {
      return step1().fail(function(err: any) {
        throw err; // rethrow - triggers makeStackTraceLong again
      });
    }

    function step3() {
      return step2().fail(function(err: any) {
        throw err; // rethrow again - triggers makeStackTraceLong again
      });
    }

    step3().fail(function(err: any) {
      try {
        const stack: string = err.stack || "";
        const separatorCount = (stack.match(/From previous event:/g) || []).length;
        // With original code: multiple rethrows through .fail handlers each call
        // makeStackTraceLong, and the `> p.stackCounter` condition allows
        // accumulating stacks from earlier promises in the source chain.
        // With mutated code: after the first call sets __minimumStackCounter__,
        // subsequent calls can't add more stacks, so fewer separators appear.
        expect(separatorCount).toBeGreaterThanOrEqual(2);
        (Q as any).longStackSupport = originalLongStackSupport;
        done();
      } catch(e) {
        (Q as any).longStackSupport = originalLongStackSupport;
        done(e);
      }
    });
  });
});