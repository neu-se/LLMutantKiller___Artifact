import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async", () => {
  it("should work with ES6-style generators", () => {
    function* generator() {
      try {
        yield Q.delay(10);
      } catch (e) {
        throw new Error("Test error");
      }
      return "done";
    }

    const asyncGenerator = Q.async(generator);
    return asyncGenerator().then((result) => {
      expect(result).toBe("done");
    }, (error) => {
      expect(error.message).toBe("Test error");
    });
  });
});