import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with ES6 generators", () => {
  it("should correctly execute an async generator function and resolve with the return value", async () => {
    // Q.async wraps a generator function and returns a function that returns a promise
    // In modern Node.js, StopIteration is undefined, so the ES6 generator path is used
    // The mutation removes the ES6 generator handling, causing the async function to never resolve
    const asyncFn = Q.async(function* () {
      const a = yield Q(1);
      const b = yield Q(2);
      return a + b;
    });

    const result = await asyncFn();
    expect(result).toBe(3);
  });
});