import { Q } from "./q";

describe("Q.async generator behavior", () => {
  it("should handle generator function that yields a value", (done) => {
    const testValue = "test";
    const generator = Q.async(function* () {
      const result = yield testValue;
      return result;
    });

    generator().then((value) => {
      expect(value).toBe(testValue);
      done();
    }).catch((error) => {
      done(error);
    });
  });
});