const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.async generator with StopIteration", () => {
  it("should correctly handle generator completion without StopIteration", (done) => {
    const testValue = "test";
    const generator = Q.async(function* () {
      const result = yield Promise.resolve(testValue);
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