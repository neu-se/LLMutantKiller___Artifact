import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
  it("should add stacks from all source-linked promises, not just the first", (done) => {
    Q.longStackSupport = true;

    const outer = Q.defer();
    const inner = Q.defer();

    // outer resolves to inner.promise
    // This sets outer.promise.source = inner.promise (both have stackCounters)
    // The .then() deferred's source = outer.promise
    // Source chain: then-deferred -> outer.promise -> inner.promise
    // All 3 have stackCounters (decreasing order)
    
    outer.promise.then(function() {
      throw new Error("test");
    }).fail(function(err: any) {
      try {
        const stack: string = err.stack || "";
        const separatorCount = (stack.match(/From previous event:/g) || []).length;
        
        // Original: loop adds stacks from then-deferred, outer.promise, inner.promise = 3 stacks
        // Plus error.stack unshifted = 4 total sections = 3 separators
        // Mutation: loop adds only then-deferred stack = 1 stack
        // Plus error.stack = 2 sections = 1 separator
        // So original >= 2, mutation = 1
        expect(separatorCount).toBeGreaterThanOrEqual(2);
        done();
      } catch(e) {
        done(e);
      }
    });

    outer.resolve(inner.promise);
    inner.resolve(42);
  });
});