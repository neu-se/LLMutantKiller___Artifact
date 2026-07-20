import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("spread", () => {
  it("should call the fulfilled callback with spread array values and return its result", () => {
    return Q([10, 20, 30])
      .spread(function (a: number, b: number, c: number) {
        return a + b + c;
      })
      .then(function (result: number) {
        expect(result).toBe(60);
      });
  });
});