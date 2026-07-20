import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async SpiderMonkey generator StopIteration handling", () => {
  it("detects the result.done mutation by checking rejection vs resolution", async () => {
    const originalStopIteration = (global as any).StopIteration;

    try {
      (global as any).StopIteration = {};

      // Use Q["return"] which throws QReturnValue (passes isStopIteration)
      // Make generator throw QReturnValue on very first call
      // result will be undefined, so result.done = undefined.done throws TypeError in original
      // but if(false) skips that in mutated -> goes to reject(exception)
      // So original throws TypeError (uncaught?), mutated rejects with QReturnValue

      const returnValue = 42;
      const fakeGenerator = {
        next: function() {
          // Throw QReturnValue immediately - result is undefined at this point
          Q["return"](returnValue);
        }
      };

      const asyncFn = Q.async(function(this: any) {
        return fakeGenerator;
      });

      let resolved: any = "NOT_SET";
      let rejected: any = "NOT_SET";

      await new Promise<void>((testResolve) => {
        asyncFn().then(
          (val: any) => { resolved = val; testResolve(); },
          (err: any) => { rejected = err; testResolve(); }
        );
      });

      // In original: result is undefined, result.done throws TypeError
      //   -> TypeError propagates up, gets caught by outer try/catch in promise(resolver)
      //   -> deferred.reject(TypeError) -> promise rejects with TypeError
      // In mutated: if(false) -> reject(QReturnValue exception) -> rejects with QReturnValue
      // Both reject, but with DIFFERENT errors!
      // Original rejects with TypeError, mutated rejects with QReturnValue instance
      
      // Check that rejection is a TypeError (original behavior)
      // vs QReturnValue (mutated behavior)
      expect(rejected).not.toBe("NOT_SET");
      // In original code, result.done on undefined throws TypeError
      expect(rejected instanceof TypeError).toBe(true);
    } finally {
      if (originalStopIteration === undefined) {
        delete (global as any).StopIteration;
      } else {
        (global as any).StopIteration = originalStopIteration;
      }
    }
  });
});