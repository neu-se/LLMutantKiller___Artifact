import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("spread", () => {
  it("should resolve with the return value of the fulfilled callback when spreading array values", () => {
    return Q([10, 20, 30])
      .spread(function (a: number, b: number, c: number) {
        return a + b + c;
      })
      .then(function (result: number) {
        expect(result).toBe(60);
      });
  });
});