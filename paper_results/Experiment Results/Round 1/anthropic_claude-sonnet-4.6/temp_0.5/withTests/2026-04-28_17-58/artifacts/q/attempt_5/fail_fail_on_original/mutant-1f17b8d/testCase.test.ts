import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
  it("should not resolve until pending promises fulfill, resolving with values not promises", (done) => {
    const deferred1 = Q.defer();

    const result = Q.all([deferred1.promise]);

    // With mutation: resolves immediately with [promise object]
    // With original: stays pending until deferred1 resolves
    
    let resolved = false;
    let resolvedValue: any = null;

    result.then(function(values: any[]) {
      resolved = true;
      resolvedValue = values;
    });

    // Check after one tick - mutated code resolves immediately
    Q.nextTick(function() {
      Q.nextTick(function() {
        Q.nextTick(function() {
          if (resolved) {
            // mutated: resolved with promise object, not a number
            expect(Q.isPromise(resolvedValue[0])).toBe(false);
          }
          deferred1.resolve(42);
          Q.nextTick(function() {
            expect(resolved).toBe(true);
            expect(resolvedValue[0]).toBe(42);
            done();
          });
        });
      });
    });
  });
});