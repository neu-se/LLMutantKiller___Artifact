import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q.async with generator", () => {
  it("should properly handle ES6 generators", (done) => {
    const testValue = "test";
    const generator = Q.async(function* () {
      const result = yield testValue;
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