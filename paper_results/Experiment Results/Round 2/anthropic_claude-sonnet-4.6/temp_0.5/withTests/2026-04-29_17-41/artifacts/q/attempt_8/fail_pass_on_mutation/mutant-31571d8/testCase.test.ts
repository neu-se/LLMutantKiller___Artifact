import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
  it("detects mutation in makeStackTraceLong stack counter comparison", (done) => {
    (Q as any).longStackSupport = true;

    // We need makeStackTraceLong called twice on the same error.
    // First call sets __minimumStackCounter__ = X.
    // Second call must have a promise in its source chain with counter < X.
    //
    // This happens when error propagates through a .then on a promise
    // that was created BEFORE the promise in the first call.
    //
    // Sequence of promise creation (stackCounters increase):
    //   N:   d = defer()          -> d.promise has counter N
    //   N+1: p1 = d.promise.then  -> p1 has counter N+1  
    //   N+2: p2 = p1.then         -> p2 has counter N+2
    //   N+3: p3 = p2.then         -> p3 has counter N+3
    //
    // When d rejects:
    //   p1._rejected fires: makeStackTraceLong(err, p1)
    //     p=p1 (N+1): no min set -> add stack, set min=N+1
    //     p=p1.source=d.promise (N): original: N+1>N -> add; mutated: false -> skip
    //   p2._rejected fires: makeStackTraceLong(err, p2)  
    //     p=p2 (N+2): min=N+1, N+1>N+2? NO -> skip (both original and mutated)
    //     p=p2.source=p1 (N+1): min=N+1, N+1>N+1? NO -> skip (both)
    //
    // So the difference is in the FIRST call: original adds 2 stacks, mutated adds 1.
    // Result: original has 1 "From previous event:", mutated has 0.
    //
    // Previous tests showed this passes on both - maybe source chain isn't set up right.
    // Let me verify by checking if d.promise actually has a stack and source.
    //
    // d.promise gets stack in defer() when longStackSupport=true.
    // p1 = d.promise.then() - p1 gets stack in defer() inside then().
    // When d rejects, become(reject(reason)) is called on d's internal promise.
    // In become: promise.source = newPromise (the reject promise).
    // But p1 is a DIFFERENT promise created by then()...
    //
    // Actually: self in _rejected is the promise that .then() was called on.
    // For p1 = d.promise.then(f, rejHandler), self = d.promise.
    // d.promise.source is set when d.promise becomes resolved.
    // d.promise.source = Q(value) = the resolved/rejected promise.
    //
    // So makeStackTraceLong(err, d.promise):
    //   p = d.promise: has stack -> add, set min = d.promise.stackCounter
    //   p = d.promise.source = reject(reason): does reject() promise have a stack? 
    //     reject() creates a Promise() not via defer(), so NO stack!
    //
    // That's why it doesn't matter - the source chain only has 1 promise with a stack!
    // 
    // To get 2 stacks in source chain, we need the source to also be a deferred promise.
    // This happens when we resolve a deferred with another deferred's promise.

    const d1 = (Q as any).defer(); // stackCounter N
    const d2 = (Q as any).defer(); // stackCounter N+1

    // Resolve d1 with d2's promise - this sets d1.promise.source = d2.promise
    d1.resolve(d2.promise);

    // Now attach a rejection handler to d1.promise
    // When d2 rejects, d1 rejects, and _rejected fires with self = d1.promise
    // makeStackTraceLong(err, d1.promise):
    //   p = d1.promise (N): no min -> add stack, set min = N
    //   p = d1.promise.source = d2.promise (N+1): original: N > N+1? NO -> skip
    //
    // Hmm, still doesn't work because d2 has HIGHER counter than d1.
    // We need source to have LOWER counter.
    // source is set to newPromise in become(). newPromise = Q(value).
    // If value is a deferred promise created BEFORE d1, it would have lower counter.

    // Create d0 FIRST (lowest counter), then d1
    const d0 = (Q as any).defer(); // counter M (lowest)
    const d1b = (Q as any).defer(); // counter M+1

    // d1b resolves to d0's promise -> d1b.promise.source = d0.promise  
    // d0.promise has counter M, d1b.promise has counter M+1
    // makeStackTraceLong(err, d1b.promise):
    //   p = d1b.promise (M+1): add stack, set min = M+1
    //   p = d0.promise (M): original: M+1 > M -> TRUE -> add stack!
    //                        mutated: false -> skip!
    // THIS IS THE CASE WE NEED!

    d1b.resolve(d0.promise);

    d1b.promise.fail(function(err: any) {
      try {
        (Q as any).longStackSupport = false;
        const stack: string = err.stack || "";
        const separators = (stack.match(/From previous event:/g) || []).length;
        // Original: 1 separator (2 stacks: d1b.promise + d0.promise)
        // Mutated: 0 separators (1 stack: only d1b.promise)
        expect(separators).toBeGreaterThanOrEqual(1);
        done();
      } catch(e) {
        (Q as any).longStackSupport = false;
        done(e);
      }
    });

    d0.reject(new Error("test error"));
  });
});