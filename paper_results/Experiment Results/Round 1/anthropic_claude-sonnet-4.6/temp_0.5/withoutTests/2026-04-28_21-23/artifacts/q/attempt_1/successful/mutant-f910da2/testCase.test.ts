import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with ES6 generators", () => {
  it("should correctly execute an async generator function using ES6 generator semantics", async () => {
    // In Node.js, StopIteration is undefined, so the original code takes the ES6 path
    // The mutation inverts this condition, causing ES6 generators to use the wrong path
    
    const asyncFn = Q.async(function* () {
      const a = yield Q.resolve(1);
      const b = yield Q.resolve(2);
      return a + b;
    });

    const result = await asyncFn().then((val: number) => val);
    expect(result).toBe(3);
  });
});