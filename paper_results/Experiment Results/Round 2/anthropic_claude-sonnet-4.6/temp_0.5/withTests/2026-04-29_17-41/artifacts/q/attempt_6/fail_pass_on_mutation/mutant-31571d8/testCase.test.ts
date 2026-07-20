import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
  it("should include stack from the promise that was resolved, not just the outer promise", (done) => {
    (Q as any).longStackSupport = true;

    // Build a specific scenario:
    // 1. Create deferred d1 (stackCounter=N)
    // 2. d1.promise.then(fn) creates promise p1 (stackCounter=N+1)  
    // 3. p1.then(fn) creates promise p2 (stackCounter=N+2)
    // 4. Reject d1 -> p1 becomes rejected -> p2 becomes rejected
    // 5. p2's source = p1 (set in become()), p1's source = d1.promise
    // 6. makeStackTraceLong(error, p2):
    //    - p=p2: stack exists, __minimumStackCounter__ not set -> add p2.stack, set min=N+2
    //    - p=p1: stack exists, original: N+2 > N+1 -> add p1.stack; mutated: false -> skip
    //    - p=d1.promise: stack exists, original: N+1 > N -> add; mutated: already skipped
    //
    // So original produces 3 stacks joined with "From previous event:"
    // Mutated produces 1 stack (only p2's)
    //
    // We can detect this by checking the number of "From previous event:" separators.
    // Original: 2 separators (3 stacks joined)
    // Mutated: 0 separators (1 stack)

    // But wait - makeStackTraceLong is called with `self` which is the promise
    // that .then() was called on, not the resolved promise.
    // In _rejected: makeStackTraceLong(exception, self)
    // self is the promise before the .then(), so self.source points back.

    // Let's create: d -> p1 = d.promise.then(A) -> p2 = p1.then(B) -> p3 = p2.then(C)
    // Reject d. Error propagates to p3's rejection handler.
    // In p3's _rejected, self = p2 (the promise .then(C) was called on)
    // p2.source = p1 (set when p1 resolved/rejected into p2)
    // p1.source = d.promise
    // So walking: p2 (N+2), p1 (N+1), d.promise (N) - 3 stacks in original, 1 in mutated

    const d = (Q as any).defer();

    const p1 = d.promise.then(function stepA() { return 1; });
    const p2 = p1.then(function stepB() { return 2; });
    const p3 = p2.then(function stepC() { return 3; });

    p3.fail(function(err: any) {
      try {
        (Q as any).longStackSupport = false;
        const stack: string = err.stack || "";
        const separators = (stack.match(/From previous event:/g) || []).length;
        // Original: 2+ separators; Mutated: 0 separators
        expect(separators).toBeGreaterThanOrEqual(1);
        done();
      } catch(e) {
        (Q as any).longStackSupport = false;
        done(e);
      }
    });

    d.reject(new Error("test error"));
  });
});