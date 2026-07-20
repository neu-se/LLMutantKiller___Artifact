import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async SpiderMonkey generator path", () => {
  it("resolves with correct value from generator in SpiderMonkey mode", async () => {
    const originalStopIteration = (global as any).StopIteration;
    (global as any).StopIteration = function StopIteration(val: any) {
      this.value = val;
    };

    try {
      let callCount = 0;
      const mockGen = {
        next: (arg: any) => {
          callCount++;
          if (callCount === 1) {
            // Return a plain value (not a promise, not StopIteration)
            return "step1";
          }
          // Second call: stop
          const si = new (global as any).StopIteration("final-" + arg);
          throw si;
        }
      };

      const asyncFn = Q.async(function () {
        return mockGen;
      });

      const value = await asyncFn();
      // Original: 
      //   call1: result = "step1", when("step1", cb, eb) -> cb("step1")
      //   call2: result = throws StopIteration("final-step1") -> Q("final-step1")
      //   value = "final-step1"
      // Mutated:
      //   call1: result = undefined, when(undefined, cb, eb) -> cb(undefined)
      //   call2: result = undefined, when(undefined, cb, eb) -> cb(undefined)
      //   ... infinite loop
      expect(value).toBe("final-step1");
    } finally {
      if (originalStopIteration === undefined) {
        delete (global as any).StopIteration;
      } else {
        (global as any).StopIteration = originalStopIteration;
      }
    }
  });
});