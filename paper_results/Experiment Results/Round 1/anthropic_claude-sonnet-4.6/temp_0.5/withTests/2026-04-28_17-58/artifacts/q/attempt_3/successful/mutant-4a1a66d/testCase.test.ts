import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async", () => {
  it("resolves correctly using SpiderMonkey semantics when StopIteration is defined", (done) => {
    const g = (global as any);

    // Make StopIteration defined so original code takes SpiderMonkey branch
    g.StopIteration = {};

    let callCount = 0;
    const mockGenerator = {
      next: function(_val: any) {
        callCount++;
        if (callCount === 1) {
          // Return a plain resolved value - SpiderMonkey style
          return 5;
        }
        // Use Q["return"] which throws QReturnValue, recognized by isStopIteration
        Q["return"](42);
      },
      throw: function(e: any) {
        throw e;
      }
    };

    const asyncFn = Q.async(function() { return mockGenerator; });
    const promise = asyncFn();

    promise.then(function(result: any) {
      delete g.StopIteration;
      // Original (SpiderMonkey path): 
      //   next(undefined) -> 5, when(5, cb, eb) -> cb(5) -> next(5) -> Q["return"](42) throws QReturnValue(42)
      //   isStopIteration(QReturnValue(42)) -> true -> Q(42) -> resolves with 42
      // Mutated (ES6 path always):
      //   next(undefined) -> 5 (plain number, not {value,done})
      //   result.done is undefined -> falsy -> when(result.value=undefined, cb, eb) -> cb(undefined) -> infinite loop or wrong result
      expect(result).toBe(42);
      done();
    }, function(err: any) {
      delete g.StopIteration;
      done(err || new Error("Promise rejected unexpectedly"));
    });
  });
});