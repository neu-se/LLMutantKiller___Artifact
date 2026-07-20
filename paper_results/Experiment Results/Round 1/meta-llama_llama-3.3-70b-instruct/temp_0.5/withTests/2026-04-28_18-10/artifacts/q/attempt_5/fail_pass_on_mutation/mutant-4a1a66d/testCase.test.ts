import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async", () => {
  it("should work with ES6-style generators", () => {
    function* generator() {
      yield Q.delay(10);
      return "done";
    }

    const asyncGenerator = Q.async(generator);
    return asyncGenerator().then((result: any) => {
      expect(result).toBe("done");
    });
  });
});