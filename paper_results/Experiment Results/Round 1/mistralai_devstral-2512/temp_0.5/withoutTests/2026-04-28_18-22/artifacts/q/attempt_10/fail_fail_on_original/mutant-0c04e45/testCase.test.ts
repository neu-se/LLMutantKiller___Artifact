const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async generator support", () => {
  it("should properly execute generator functions and handle Q.return", () => {
    // This test targets the SpiderMonkey generator path where the mutation removes the try-catch block
    // We test that Q.return (which throws QReturnValue) is properly handled

    const result = Q.async(function () {
      return {
        next: function (arg: any) {
          throw new Q.QReturnValue("return_value");
        },
        throw: function (exception: any) {
          if (exception instanceof Q.QReturnValue) {
            return { value: exception.value, done: true };
          }
          throw exception;
        }
      };
    })();

    return result.then(function (value: unknown) {
      expect(value).toBe("return_value");
    });
  });
});