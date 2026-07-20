import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.async", () => {
  it("should throw an error when the verb is not 'next'", () => {
    function* generator() {
      yield Q.resolve(42);
    }
    const asyncGenerator = Q.async(generator);
    const continuer = asyncGenerator.continuer;
    expect(() => continuer("", null)).toThrow();
  });
});