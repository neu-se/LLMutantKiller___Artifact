import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async SpiderMonkey generator path", () => {
  it("passes the correct intermediate value to subsequent generator steps", async () => {
    const originalStopIteration = (global as any).StopIteration;

    function MockStopIteration(this: any, val: any) {
      this.value = val;
    }
    Object.defineProperty(MockStopIteration.prototype, Symbol.toStringTag, {
      value: "StopIteration",
      configurable: true,
    });

    (global as any).StopIteration = MockStopIteration;

    try {
      let callCount = 0;
      const mockGen = {
        next: (arg: any) => {
          callCount++;
          if (callCount === 1) {
            return "intermediate";
          }
          // Throw a StopIteration-like object recognized by isStopIteration
          throw new (MockStopIteration as any)("done:" + String(arg));
        }
      };

      const asyncFn = Q.async(function () {
        return mockGen;
      });

      const value = await asyncFn();
      // Original:
      //   call1: result = "intermediate", when("intermediate", cb, eb) -> cb("intermediate")
      //   call2: generator.next("intermediate") throws StopIteration("done:intermediate") -> Q("done:intermediate")
      //   value = "done:intermediate"
      // Mutated:
      //   call1: result = undefined, when(undefined, cb, eb) -> cb(undefined)
      //   call2: generator.next(undefined) throws StopIteration("done:undefined") -> Q("done:undefined")
      //   value = "done:undefined"
      expect(value).toBe("done:intermediate");
    } finally {
      if (originalStopIteration === undefined) {
        delete (global as any).StopIteration;
      } else {
        (global as any).StopIteration = originalStopIteration;
      }
    }
  });
});