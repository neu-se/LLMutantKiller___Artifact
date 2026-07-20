import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("spread", () => {
  it("should return a promise that resolves with the spread result", () => {
    const result = Q([1, 2, 3]).spread(function (a: number, b: number, c: number) {
      return a + b + c;
    });

    return result.then(function (value: number) {
      expect(value).toBe(6);
    });
  });
});