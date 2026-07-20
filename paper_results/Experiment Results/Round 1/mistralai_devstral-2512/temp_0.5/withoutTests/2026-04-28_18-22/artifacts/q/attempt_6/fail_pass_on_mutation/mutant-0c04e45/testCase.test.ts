const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async generator support", () => {
  it("should properly execute generator next() calls in SpiderMonkey style", () => {
    // This test targets the SpiderMonkey generator path where the mutation removes the try-catch block
    // We test that the generator's next() method is actually called

    let nextCalled = false;
    const result = Q.async(function () {
      return {
        next: function (arg: any) {
          nextCalled = true;
          return { value: "success", done: true };
        },
        throw: function (exception: any) {
          throw exception;
        }
      };
    })();

    return result.then(function (value: unknown) {
      expect(nextCalled).toBe(true);
      expect(value).toBe("success");
    });
  });
});