import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with QReturnValue (isStopIteration)", () => {
  it("should resolve with the return value when Q.return() is used in a Q.async generator (SpiderMonkey path)", async () => {
    // We need to test the SpiderMonkey generator path where isStopIteration
    // is called with a QReturnValue instance.
    // We simulate this by temporarily defining StopIteration globally,
    // then using Q.async with a fake generator that throws a QReturnValue.
    
    // Temporarily set StopIteration to trigger the SpiderMonkey path
    (global as any).StopIteration = {};
    
    try {
      // Create a fake generator that throws a QReturnValue (via Q.return)
      const asyncFn = Q.async(function() {
        // This fake generator object simulates SpiderMonkey generator behavior
        let called = false;
        return {
          next: function(arg: any) {
            if (!called) {
              called = true;
              // Throw a QReturnValue to signal return
              Q["return"](42);
            }
          }
        };
      });

      // Actually, Q.async calls makeGenerator.apply(this, arguments) to get the generator,
      // then calls callback() which calls continuer("next", undefined).
      // In SpiderMonkey path: result = generator["next"](undefined)
      // If that throws, it checks isStopIteration(exception).
      // If isStopIteration returns true -> return Q(exception.value)
      // If isStopIteration returns false -> return reject(exception)

      const makeGenerator = function(this: any) {
        return {
          next: function() {
            Q["return"](42); // throws QReturnValue(42)
          }
        };
      };

      const result = await Q.async(makeGenerator)();
      expect(result).toBe(42);
    } finally {
      delete (global as any).StopIteration;
    }
  });
});