import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
  it("does not duplicate stack frames across multiple rethrows", () => {
    Q.longStackSupport = true;

    // Create a chain where we can count duplications precisely
    // func_ANCHOR creates the initial promise - its name should appear
    // in the stack trace. With multiple rethrows, the mutated code
    // will include it multiple times.
    function func_ANCHOR() {
      const d = Q.defer();
      d.reject(new Error("test"));
      return d.promise;
    }

    return func_ANCHOR()
      .then(null, function rethrow1(err: any) { throw err; })
      .then(null, function rethrow2(err: any) { throw err; })
      .then(null, function rethrow3(err: any) { throw err; })
      .then(null, function finalCatch(err: any) {
        Q.longStackSupport = false;
        const stack: string = err.stack || "";
        // func_ANCHOR should appear in the stack trace
        // With original: __minimumStackCounter__ prevents re-adding the same
        // promise's stack, so func_ANCHOR appears a bounded number of times
        // With mutated: func_ANCHOR's stack gets re-added on every rethrow
        // leading to many more occurrences (3+ rethrows = 3+ duplicates)
        const anchorCount = (stack.match(/func_ANCHOR/g) || []).length;
        // Original: appears once or twice at most
        // Mutated: appears 3+ times due to no deduplication
        expect(anchorCount).toBeLessThanOrEqual(2);
      });
  });
});