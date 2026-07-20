const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.async with StopIteration handling", () => {
  it("should properly handle generators with StopIteration", (done) => {
    const testValue = "test";
    const generator = Q.async(function* () {
      yield testValue;
      return testValue;
    });

    generator().then((value: string) => {
      expect(value).toBe(testValue);
      done();
    }).catch((error: Error) => {
      done(error);
    });
  });
});