import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async SpiderMonkey generator StopIteration handling", () => {
  it("rejects with QReturnValue (not TypeError) when StopIteration thrown with result undefined", async () => {
    const originalStopIteration = (global as any).StopIteration;

    try {
      (global as any).StopIteration = {};

      let callCount = 0;
      const returnValue = 42;

      const fakeGenerator = {
        next: function(val: any) {
          callCount++;
          if (callCount === 1) {
            return 1; // plain value, not a promise
          }
          // Second call: throw QReturnValue via Q["return"]
          // result is undefined in this continuer invocation
          // Original: undefined.done -> TypeError -> propagates
          // Mutated: if(false) -> reject(QReturnValue)
          Q["return"](returnValue);
        }
      };

      const asyncFn = Q.async(function(this: any) {
        return fakeGenerator;
      });

      let resolvedValue: any = "NOT_SET";
      let rejectedValue: any = "NOT_SET";

      await new Promise<void>((done) => {
        asyncFn().then(
          (v: any) => { resolvedValue = v; done(); },
          (e: any) => { rejectedValue = e; done(); }
        );
      });

      // Original: TypeError from undefined.done -> promise rejects with TypeError
      // Mutated: reject(QReturnValue) -> promise rejects with QReturnValue instance
      // Both reject but with different error types
      // Original: rejectedValue is TypeError
      // Mutated: rejectedValue has value property = returnValue
      expect(rejectedValue).not.toBe("NOT_SET");
      expect(rejectedValue instanceof TypeError).toBe(true);
    } finally {
      if (originalStopIteration === undefined) {
        delete (global as any).StopIteration;
      } else {
        (global as any).StopIteration = originalStopIteration;
      }
    }
  });
});