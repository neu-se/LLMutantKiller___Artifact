import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.fcall", () => {
  it("should fulfill a promise by calling the function with provided arguments", () => {
    return Q(function (a: number, b: number, c: number) {
      return a + b + c;
    })
      .fcall(1, 2, 3)
      .then(function (sum: number) {
        expect(sum).toEqual(6);
      });
  });
});