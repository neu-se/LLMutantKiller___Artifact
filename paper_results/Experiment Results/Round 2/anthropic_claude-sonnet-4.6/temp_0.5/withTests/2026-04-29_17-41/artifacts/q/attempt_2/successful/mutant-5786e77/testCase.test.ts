import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("spread", () => {
  it("should return a promise that resolves with the result of the callback applied to array elements", () => {
    let callbackCalled = false;
    const result = Q([1, 2, 3]).spread(function (a: number, b: number, c: number) {
      callbackCalled = true;
      return a + b + c;
    });

    return result.then(function (sum: number) {
      expect(callbackCalled).toBe(true);
      expect(sum).toBe(6);
    });
  });
});