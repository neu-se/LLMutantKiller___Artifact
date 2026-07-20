import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async SpiderMonkey generator StopIteration handling", () => {
  it("detects mutation in StopIteration done check", async () => {
    const originalStopIteration = (global as any).StopIteration;

    try {
      (global as any).StopIteration = {};

      const returnValue = 123;
      let callCount = 0;

      const stopIterException: any = {};
      stopIterException[Symbol.toStringTag] = "StopIteration";
      stopIterException.value = returnValue;

      // result needs to be an object with done=true when StopIteration is thrown
      // So first call returns { done: true, value: ... }, then second call throws
      // But wait - if first call returns { done: true }, then when() is called with it
      // and callback is called again, which calls generator.next() again -> throws StopIteration
      // At that point result = { done: true } from previous iteration
      const fakeGenerator = {
        next: function(val: any) {
          callCount++;
          if (callCount === 1) {
            // Return plain object with done:true - when() will treat it as a value
            return { done: true, value: returnValue };
          } else {
            throw stopIterException;
          }
        }
      };

      const asyncFn = Q.async(function(this: any) {
        return fakeGenerator;
      });

      let resolved: any = "NOT_SET";
      let rejected: any = "NOT_SET";

      await asyncFn().then(
        (val: any) => { resolved = val; },
        (err: any) => { rejected = err; }
      );

      // Original: result = {done:true} from prev iteration, result.done is true
      //           -> returns Q(exception.value) = Q(123) -> resolves to 123
      // Mutated: if(false) -> returns reject(exception) -> rejects
      expect(rejected).toBe("NOT_SET");
      expect(resolved).toBe(returnValue);
    } finally {
      if (originalStopIteration === undefined) {
        delete (global as any).StopIteration;
      } else {
        (global as any).StopIteration = originalStopIteration;
      }
    }
  });
});