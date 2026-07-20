import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with ES6 generators", () => {
  it("should correctly resolve the return value of a generator function", async () => {
    // In modern Node.js, StopIteration is undefined
    // Original code: typeof StopIteration === "undefined" → true → uses ES6 path
    // Mutated code: typeof StopIteration !== "undefined" → false → uses SpiderMonkey path
    // 
    // With ES6 path: when generator is done (result.done === true), returns Q(result.value)
    // With SpiderMonkey path: expects StopIteration exception to signal completion,
    //   so it calls when(result, callback, errback) on the return value instead
    
    const asyncFn = Q.async(function* () {
      const a = yield Q.resolve(1);
      const b = yield Q.resolve(2);
      return a + b;
    });

    const result = await asyncFn();
    expect(result).toBe(3);
  });
});