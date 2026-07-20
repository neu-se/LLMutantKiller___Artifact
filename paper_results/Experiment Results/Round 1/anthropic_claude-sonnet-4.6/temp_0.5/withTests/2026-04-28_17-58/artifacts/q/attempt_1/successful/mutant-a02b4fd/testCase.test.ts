import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("fulfill post with named method", () => {
  it("should call the named method on the object, not apply the object as a function", () => {
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