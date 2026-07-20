import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with ES6 generators", () => {
  it("should correctly resolve the return value of a generator function", async () => {
    const asyncFunc = Q.async(function* () {
      const a = yield Q(1);
      const b = yield Q(2);
      return a + b;
    });

    const result = await asyncFunc();
    expect(result).toBe(3);
  });
});