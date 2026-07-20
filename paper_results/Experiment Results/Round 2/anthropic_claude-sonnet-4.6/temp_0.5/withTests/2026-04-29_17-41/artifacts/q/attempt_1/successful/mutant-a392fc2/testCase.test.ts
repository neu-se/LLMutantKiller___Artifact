import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("fin with valid callback", () => {
  it("should fulfill with the original value when a valid function callback is provided", () => {
    return Q("foo")
      .fin(function () {
        return "bar";
      })
      .then(function (result: unknown) {
        expect(result).toBe("foo");
      });
  });
});