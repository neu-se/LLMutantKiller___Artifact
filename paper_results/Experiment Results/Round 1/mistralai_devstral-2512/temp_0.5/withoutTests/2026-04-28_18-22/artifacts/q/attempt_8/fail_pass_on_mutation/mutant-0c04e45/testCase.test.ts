const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async generator support", () => {
  it("should properly execute generator functions and handle return values", () => {
    // This test specifically targets the SpiderMonkey generator path
    // The mutation removes the actual generator execution (empty try block)
    // We test that the generator's next() method is actually called and returns expected value

    let generatorCalled = false;
    const testValue = "generator_result";

    const result = Q.async(function () {
      return {
        next: function (arg: any) {
          generatorCalled = true;
          return { value: testValue, done: true };
        },
        throw: function (exception: any) {
          throw exception;
        }
      };
    })();

    return result.then(function (value: unknown) {
      expect(generatorCalled).toBe(true);
      expect(value).toBe(testValue);
    });
  });
});