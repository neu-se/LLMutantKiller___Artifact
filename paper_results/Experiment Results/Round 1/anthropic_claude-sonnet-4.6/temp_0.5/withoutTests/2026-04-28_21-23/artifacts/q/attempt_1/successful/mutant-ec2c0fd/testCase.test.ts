import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with ES6 generators", () => {
  it("should correctly handle generator return values using Q.async", async () => {
    // This test uses Q.async with a generator function that returns a value.
    // The original code checks `if (typeof StopIteration === "undefined")` which is true
    // in modern JS environments (StopIteration is not defined), so it uses the ES6 generator path.
    // The mutated code uses `if (false)` which always skips the ES6 path,
    // causing it to fall into the SpiderMonkey/Python-style generator path which
    // doesn't handle ES6 generators correctly.

    const asyncFn = Q.async(function* () {
      const a = yield Q(1);
      const b = yield Q(2);
      return a + b;
    });

    const result = await asyncFn();
    expect(result).toBe(3);
  });
});