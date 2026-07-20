import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with ES6 generators", () => {
  it("should correctly handle async generator functions that yield promises", async () => {
    // This test uses Q.async with a generator function
    // The mutation removes the ES6 generator handling code, replacing it with an empty block
    // So when StopIteration is undefined (ES6 environment), the generator result won't be processed
    
    const asyncFn = Q.async(function* () {
      const value1 = yield Q.resolve(1);
      const value2 = yield Q.resolve(2);
      return value1 + value2;
    });

    const result = await asyncFn();
    expect(result).toBe(3);
  });
});