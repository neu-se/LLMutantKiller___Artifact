const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async generator support", () => {
  it("should properly handle generator execution and return values", () => {
    // This test targets the SpiderMonkey generator path where the mutation removes the try-catch block
    // We need to test that the generator actually executes and returns the correct value

    const result = Q.async(function () {
      let step = 0;
      return {
        next: function (arg: any) {
          step++;
          if (step === 1) {
            return { value: Q.delay(10, "first"), done: false };
          } else {
            return { value: "success", done: true };
          }
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