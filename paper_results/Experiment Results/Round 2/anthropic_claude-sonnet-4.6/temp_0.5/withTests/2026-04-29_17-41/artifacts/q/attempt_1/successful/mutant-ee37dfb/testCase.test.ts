import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.post", () => {
  it("should invoke a method on the fulfilled value and return a promise for the result", () => {
    const subject = {
      add: function (a: number, b: number) {
        return a + b;
      }
    };

    return Q(subject)
      .post("add", [3, 4])
      .then(function (result: number) {
        expect(result).toBe(7);
      });
  });
});