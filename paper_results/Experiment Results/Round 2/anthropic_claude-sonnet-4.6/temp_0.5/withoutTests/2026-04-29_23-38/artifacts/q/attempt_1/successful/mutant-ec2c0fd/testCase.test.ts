import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with ES6 generators", () => {
  it("should correctly execute an async generator function using ES6 generator protocol", async () => {
    // In modern Node.js, typeof StopIteration === "undefined" is true
    // so the ES6 generator path (checking result.done) should be used
    // With the mutation (if (false)), the SpiderMonkey path is used instead,
    // which doesn't handle ES6 generators correctly
    
    const asyncFn = Q.async(function* () {
      const a = yield Q.resolve(1);
      const b = yield Q.resolve(2);
      return a + b;
    });

    const result = await asyncFn().then((val: number) => val);
    expect(result).toBe(3);
  });
});