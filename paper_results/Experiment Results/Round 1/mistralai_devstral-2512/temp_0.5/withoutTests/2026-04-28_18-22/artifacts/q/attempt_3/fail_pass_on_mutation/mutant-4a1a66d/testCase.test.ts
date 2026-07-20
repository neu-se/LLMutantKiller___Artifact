const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.async with ES6 generators", () => {
  it("should handle generator that yields and returns values", (done) => {
    const testValue = "test";
    const generator = Q.async(function* (): Generator<string, string, string> {
      const result: string = yield testValue;
      return result;
    });

    generator().then((value: string) => {
      expect(value).toBe(testValue);
      done();
    }).catch((error: Error) => {
      done(error);
    });
  });
});