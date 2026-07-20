import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with ES6 generators", () => {
  it("should correctly handle generator functions that yield promises", async () => {
    // This test uses Q.async with a generator function that yields a promise
    // The original code handles ES6 generators (when StopIteration is undefined)
    // by checking result.done and returning Q(result.value) when done
    // The mutated code removes this branch entirely, causing the generator to not work

    const asyncFn = Q.async(function* () {
      const val1 = yield Q(1);
      const val2 = yield Q(2);
      return val1 + val2;
    });

    const result = await asyncFn();
    expect(result).toBe(3);
  });
});