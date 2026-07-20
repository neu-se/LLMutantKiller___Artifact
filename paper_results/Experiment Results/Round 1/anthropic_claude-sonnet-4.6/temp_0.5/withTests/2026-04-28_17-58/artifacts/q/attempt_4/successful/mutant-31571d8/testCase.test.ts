import Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("long stack traces", () => {
  it("should update __minimumStackCounter__ across multiple promise sources so stacks from older promises are included", (done) => {
    Q.longStackSupport = true;

    // Create a chain where error is rethrown through multiple rejection handlers
    // Each rethrow goes through _rejected which calls makeStackTraceLong
    // The key: makeStackTraceLong walks p.source chain; original updates
    // __minimumStackCounter__ allowing older frames, mutated does not.
    
    const d1 = Q.defer();
    const d2 = Q.defer();
    const d3 = Q.defer();

    // Chain: d3 -> d2 -> d1, each created at different times (different stackCounters)
    // d1 has lowest stackCounter (created first), d3 has highest
    
    const p1 = d1.promise.then(function handler1() {
      return d2.promise;
    });
    
    const p2 = p1.then(function handler2() {
      return d3.promise;
    });

    p2.then(
      function () {
        Q.longStackSupport = false;
        done(new Error("Should have rejected"));
      },
      function (err: any) {
        Q.longStackSupport = false;
        try {
          const stack: string = err.stack || "";
          // With original: makeStackTraceLong walks source chain, updating
          // __minimumStackCounter__ each time it finds an older promise,
          // collecting multiple stacks -> multiple "From previous event:"
          // With mutated: only the first source's stack is added (condition
          // becomes false after first set of __minimumStackCounter__)
          const separatorCount = (stack.match(/From previous event:/g) || []).length;
          expect(separatorCount).toBeGreaterThanOrEqual(2);
          done();
        } catch (e) {
          done(e);
        }
      }
    );

    d1.resolve(undefined);
    d2.resolve(undefined);
    d3.reject(new Error("original error"));
  });
});