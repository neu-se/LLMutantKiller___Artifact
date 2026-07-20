import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async", () => {
  it("should work with ES6-style generators and StopIteration", () => {
    function* generator() {
      yield Q.delay(10, null);
      throw new Error("Test error");
    }

    const asyncGenerator = Q.async(generator);
    return asyncGenerator().then((result: any) => {
      expect(true).toBe(false);
    }, (error: any) => {
      expect(error.message).toBe("Test error");
    });
  });
});