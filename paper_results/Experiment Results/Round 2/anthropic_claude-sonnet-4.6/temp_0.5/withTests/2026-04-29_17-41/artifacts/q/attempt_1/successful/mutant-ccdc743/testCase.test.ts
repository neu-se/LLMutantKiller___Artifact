import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("fin with valid callback", () => {
  it("should fulfill with the original value when callback is a valid function", () => {
    return Q("foo")
      ["finally"](function () {
        return "bar";
      })
      .then(function (result: any) {
        expect(result).toBe("foo");
      });
  });
});