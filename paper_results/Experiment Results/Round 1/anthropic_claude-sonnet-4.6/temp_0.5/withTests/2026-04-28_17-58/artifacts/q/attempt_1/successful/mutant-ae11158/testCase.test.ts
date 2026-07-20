import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nfapply", () => {
  it("should fulfill with callback result when calling Q.nfapply with a function and args array", () => {
    return Q.nfapply(function (a: number, b: number, c: number, callback: Function) {
      callback(null, a + b + c);
    }, [1, 2, 3])
    .then(function (sum: number) {
      expect(sum).toEqual(6);
    });
  });
});