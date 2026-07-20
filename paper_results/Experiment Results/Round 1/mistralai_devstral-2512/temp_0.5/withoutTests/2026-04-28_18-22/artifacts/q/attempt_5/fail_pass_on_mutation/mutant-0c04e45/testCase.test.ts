const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async generator support", () => {
  it("should properly handle generator exceptions in SpiderMonkey style", () => {
    // This test targets the SpiderMonkey generator path where the mutation removes the try-catch block
    // We test that exceptions are properly caught and handled

    const result = Q.async(function () {
      return {
        next: function (arg: any) {
          throw new Error("test error");
        },
        throw: function (exception: any) {
          throw exception;
        }
      };
    })();

    return result.then(
      function () {
        throw new Error("Should have rejected");
      },
      function (error: Error) {
        expect(error.message).toBe("test error");
      }
    );
  });
});