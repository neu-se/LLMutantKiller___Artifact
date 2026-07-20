const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async generator support", () => {
  it("should properly execute generator functions in SpiderMonkey style", () => {
    // This test specifically targets the SpiderMonkey generator path
    // The mutation removes the actual generator execution (try block is empty)
    // so we test that the generator is actually executed

    let executed = false;
    const result = Q.async(function () {
      return {
        next: function (arg: any) {
          executed = true;
          return { value: "success", done: true };
        },
        throw: function (exception: any) {
          throw exception;
        }
      };
    })();

    return result.then(function (value: unknown) {
      expect(executed).toBe(true);
      expect(value).toBe("success");
    });
  });
});