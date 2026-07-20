const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async generator support", () => {
  it("should properly handle generator return values in SpiderMonkey style", () => {
    // This test targets the SpiderMonkey generator path in Q.async
    // The mutation removes the actual generator execution, so we test that values are properly yielded

    const result = Q.async(function () {
      return {
        next: function (arg: any) {
          return { value: "success", done: true };
        },
        throw: function (exception: any) {
          throw exception;
        }
      };
    })();

    return result.then(function (value: unknown) {
      expect(value).toBe("success");
    });
  });
});