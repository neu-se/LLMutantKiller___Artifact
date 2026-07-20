import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.async", () => {
  it("should work with a generator that yields a promise and the verb is 'next'", () => {
    function* generator() {
      yield Q.resolve(42);
    }
    const asyncGenerator = Q.async(generator);
    const continuer = asyncGenerator.continuer;
    expect(() => continuer("next", null)).not.toThrow();
    expect(() => continuer("", null)).toThrow();
  });
});