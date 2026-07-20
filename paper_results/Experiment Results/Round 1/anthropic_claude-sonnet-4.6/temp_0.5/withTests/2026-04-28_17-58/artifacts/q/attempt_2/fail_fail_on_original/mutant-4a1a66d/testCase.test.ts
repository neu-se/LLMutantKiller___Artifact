import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async", () => {
  it("uses SpiderMonkey generator path when StopIteration is defined globally, resolving with iterator result object", (done) => {
    const g = (global as any);
    const originalStopIteration = g.StopIteration;

    // Define StopIteration to simulate SpiderMonkey environment
    function FakeStopIteration(this: any, value: any) {
      this.value = value;
    }
    g.StopIteration = FakeStopIteration;

    try {
      // Create a mock generator that behaves like a SpiderMonkey-style generator:
      // - next() returns a value directly (not {value, done})
      // - throws StopIteration when exhausted
      let callCount = 0;
      const mockGenerator = {
        next: function(val: any) {
          callCount++;
          if (callCount === 1) {
            // Return a plain value (SpiderMonkey style, not {value, done})
            return Q.resolve(99);
          }
          // Done: throw StopIteration with the return value
          throw new FakeStopIteration(42);
        },
        throw: function(e: any) {
          throw e;
        }
      };

      const makeGenerator = function() {
        return mockGenerator;
      };

      const asyncFn = Q.async(makeGenerator);
      const promise = asyncFn();

      promise.then(function(result: any) {
        // Original code (SpiderMonkey path):
        //   callCount=1: when(Q.resolve(99), callback, errback) -> callback(99) -> next(99)
        //   callCount=2: throws StopIteration(42) -> isStopIteration -> Q(42) -> resolves with 42
        // Mutated code (ES6 path always):
        //   callCount=1: result = Q.resolve(99) (a promise, not {value,done})
        //   result.done is undefined (falsy) -> when(result.value=undefined, callback, errback)
        //   This would NOT resolve to 42
        expect(result).toBe(42);
        done();
      }, function(err: any) {
        done(err);
      });
    } finally {
      if (originalStopIteration === undefined) {
        delete g.StopIteration;
      } else {
        g.StopIteration = originalStopIteration;
      }
    }
  });
});