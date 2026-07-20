import Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async SpiderMonkey generator path", () => {
  it("should return the value from the generator when StopIteration is thrown", (done) => {
    // Use QReturnValue-like approach: need isStopIteration to return true
    // isStopIteration checks: object_toString(exception) === "[object StopIteration]"
    // OR exception instanceof QReturnValue
    // We can use Q["return"] which throws a QReturnValue

    // First, define StopIteration so the SpiderMonkey branch is taken
    (global as any).StopIteration = "defined";

    let callCount = 0;
    const mockGenerator = {
      next: function (arg: any) {
        callCount++;
        if (callCount === 1) {
          // Return a plain value (not a promise) - in SpiderMonkey style
          // result is used directly: when(result, callback, errback)
          // So returning a non-thenable means callback gets called with it
          return 42;
        }
        // Second call: throw a QReturnValue to stop iteration
        // Q["return"](value) throws new QReturnValue(value)
        // which isStopIteration recognizes
        Q["return"](99);
      },
      throw: function (e: any) {
        throw e;
      }
    };

    const asyncFn = Q.async(function () {
      return mockGenerator as any;
    });

    asyncFn()
      .then((result: any) => {
        delete (global as any).StopIteration;
        // Original: result = generator.next(undefined) = 42
        //   when(42, callback, errback) -> callback(42) -> generator.next(42)
        //   -> throws QReturnValue(99) -> isStopIteration -> Q(99) resolves to 99
        // Mutated: result = undefined
        //   when(undefined, callback, errback) -> callback(undefined) -> generator.next(undefined)
        //   -> returns 42 again (callCount=2 now... wait this gets complex)
        expect(result).toBe(99);
        done();
      })
      .catch((e: any) => {
        delete (global as any).StopIteration;
        done(e);
      });
  });
});