import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with ES6 generators", () => {
  it("should correctly resolve a simple async generator function using ES6 semantics", async () => {
    // In modern Node.js, StopIteration is undefined, so the original code
    // takes the ES6 path (checks result.done). The mutated code inverts the
    // condition, taking the SpiderMonkey path which does NOT check result.done
    // and instead tries to use the result directly as a promise value,
    // causing incorrect behavior.
    const asyncFn = Q.async(function* () {
      const a = yield Q(1);
      const b = yield Q(2);
      return a + b;
    });

    const result = await asyncFn().then((val: number) => val);
    expect(result).toBe(3);
  });
});