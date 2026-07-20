import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with ES6 generators", () => {
  it("should correctly pass values through yield expressions", () => {
    const asyncFn = Q.async(function* () {
      const a = yield Q.resolve(1);
      const b = yield Q.resolve(2);
      return a + b;
    });

    return asyncFn().then((result: number) => {
      expect(result).toBe(3);
    });
  });
});