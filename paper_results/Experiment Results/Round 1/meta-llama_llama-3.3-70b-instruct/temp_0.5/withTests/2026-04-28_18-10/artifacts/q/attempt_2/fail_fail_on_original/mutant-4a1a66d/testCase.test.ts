import { Q } from "../../../q";

describe("Q.async", () => {
  it("should work with ES6-style generators", () => {
    function* generator() {
      yield Q.delay(10);
      throw new Error("Test error");
    }

    const asyncGenerator = Q.async(generator);
    return asyncGenerator().then(() => {
      expect(true).toBe(false);
    }, (error) => {
      expect(error.message).toBe("Test error");
    });
  });
});