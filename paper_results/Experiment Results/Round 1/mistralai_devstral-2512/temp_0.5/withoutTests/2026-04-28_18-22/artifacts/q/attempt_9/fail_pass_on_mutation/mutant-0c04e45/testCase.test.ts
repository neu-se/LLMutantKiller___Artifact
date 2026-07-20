const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async generator support", () => {
  it("should properly execute generator functions and handle multiple yields", () => {
    // This test targets the SpiderMonkey generator path where the mutation removes the try-catch block
    // We test that the generator actually executes through multiple steps

    let stepCount = 0;
    const result = Q.async(function () {
      return {
        next: function (arg: any) {
          stepCount++;
          if (stepCount === 1) {
            return { value: Q.delay(1, "first"), done: false };
          } else if (stepCount === 2) {
            return { value: "second", done: false };
          } else {
            return { value: "final", done: true };
          }
        },
        throw: function (exception: any) {
          throw exception;
        }
      };
    })();

    return result.then(function (value: unknown) {
      expect(stepCount).toBe(3);
      expect(value).toBe("final");
    });
  });
});