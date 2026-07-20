import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with ES6 generators", () => {
  it("should correctly resolve values yielded from an async generator", async () => {
    // This test relies on the ES6 generator path (typeof StopIteration === "undefined")
    // The mutation changes this condition to `false`, forcing the SpiderMonkey path
    // which doesn't handle result.done/result.value correctly
    
    const asyncFn = Q.async(function* () {
      const a = yield Q(1);
      const b = yield Q(2);
      return a + b;
    });

    const result = await asyncFn();
    expect(result).toBe(3);
  });
});