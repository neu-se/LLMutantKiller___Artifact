import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
  it("should not re-add stacks from promises already included when error propagates through multiple then handlers", (done) => {
    (Q as any).longStackSupport = true;

    // makeStackTraceLong is called each time _rejected runs.
    // First call: self=p1, p1.source=d.promise
    //   - p=p1: no __minimumStackCounter__ -> add p1.stack, set min=p1.stackCounter (higher)
    //   - p=d.promise: original: p1.stackCounter > d.stackCounter -> TRUE -> add d.stack
    //                  mutated: false -> skip
    // So first call: original adds 2 stacks, mutated adds 1 stack
    // 
    // Second call (error rethrown to next handler): self=p2, p2.source=p1
    //   - p=p2: __minimumStackCounter__ is set to p1.stackCounter
    //     original: p1.stackCounter > p2.stackCounter? p2 > p1, so NO -> skip
    //     mutated: false -> skip
    //   - p=p1: original: p1.stackCounter > p1.stackCounter? NO -> skip
    //           mutated: false -> skip
    //
    // So the difference is in the FIRST call to makeStackTraceLong:
    // original adds source chain stacks, mutated only adds the first one.
    // 
    // Test: verify that after first rejection, the stack contains content
    // from BOTH the rejecting promise AND its source promise.

    // Create: d.promise -> p1 (via .then) 
    // d.promise has stack at counter N
    // p1 has stack at counter N+1
    // p1.source = d.promise (set in become when d resolves/rejects into p1)
    //
    // When d rejects, p1's _rejected fires with self=p1
    // makeStackTraceLong(error, p1):
    //   p=p1: add p1.stack (counter N+1), set min=N+1
    //   p=d.promise: original: N+1 > N -> add d.promise.stack; mutated: false -> skip
    //
    // We can check: does the final stack contain content from d.promise's creation point?
    // d.promise was created in a specific named function - check for that name.

    function createDeferred() {
      // d.promise gets a stack captured here
      return (Q as any).defer();
    }

    const d = createDeferred();

    function attachThen() {
      // p1 gets a stack captured here  
      return d.promise.then(function() { return 1; });
    }

    const p1 = attachThen();

    p1.fail(function(err: any) {
      try {
        (Q as any).longStackSupport = false;
        const stack: string = err.stack || "";
        const separators = (stack.match(/From previous event:/g) || []).length;
        // Original: d.promise.stack is added (N+1 > N), so 1 separator minimum
        // Mutated: only p1.stack added, 0 separators
        expect(separators).toBeGreaterThanOrEqual(1);
        done();
      } catch(e) {
        (Q as any).longStackSupport = false;
        done(e);
      }
    });

    d.reject(new Error("test"));
  });
});