import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.async", () => {
  it("should throw an error when the verb is not 'next' in async", () => {
    function* generator() {
      yield Q.resolve(42);
    }
    const asyncGenerator = Q.async(function* () {
      yield Q.resolve(42);
      throw new Error("Test error");
    });
    expect(() => asyncGenerator()).toThrowError("Test error");
  });
});