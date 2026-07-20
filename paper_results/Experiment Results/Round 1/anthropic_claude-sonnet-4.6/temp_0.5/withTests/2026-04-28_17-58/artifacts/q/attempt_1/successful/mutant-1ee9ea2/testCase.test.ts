import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with ES6 generators", () => {
  it("should return a promise that resolves with the generator's return value", () => {
    const asyncFn = Q.async(function* () {
      const a = yield Q(1);
      const b = yield Q(2);
      return a + b;
    });

    const result = asyncFn();

    expect(Q.isPromise(result)).toBe(true);

    return result.then((value: number) => {
      expect(value).toBe(3);
    });
  });
});