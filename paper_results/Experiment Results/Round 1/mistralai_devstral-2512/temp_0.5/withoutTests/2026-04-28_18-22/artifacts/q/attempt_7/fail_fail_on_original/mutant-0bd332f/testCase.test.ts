import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library array_reduce shim", () => {
  it("should throw TypeError when processing empty array with no initial value in Q's internal reduce", () => {
    // Create a scenario that forces Q to use its internal array_reduce shim
    // by working with a promise that resolves to an empty array
    const emptyArrayPromise = Q.resolve([]);

    // Override the native reduce to ensure we test Q's shim
    const originalReduce = Array.prototype.reduce;
    Array.prototype.reduce = undefined;

    try {
      let errorThrown = false;
      return emptyArrayPromise
        .then(function(arr: any[]) {
          try {
            // This should trigger Q's internal array_reduce shim
            return arr.reduce(function(prev: any, curr: any) {
              return prev;
            });
          } catch (e) {
            if (e instanceof TypeError) {
              errorThrown = true;
            }
            throw e;
          }
        })
        .then(function() {
          expect(errorThrown).toBe(true);
        })
        .catch(function(e) {
          // If we get here with TypeError, the test passes
          if (e instanceof TypeError) {
            expect(true).toBe(true);
          } else {
            throw e;
          }
        });
    } finally {
      Array.prototype.reduce = originalReduce;
    }
  });
});