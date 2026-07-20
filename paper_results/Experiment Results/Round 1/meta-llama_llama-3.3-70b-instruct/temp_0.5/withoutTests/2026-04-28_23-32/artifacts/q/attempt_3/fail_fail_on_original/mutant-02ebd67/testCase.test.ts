import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.async", () => {
  it("should work with a generator that yields a promise", () => {
    function* generator() {
      yield Q.resolve(42);
    }
    const asyncGenerator = Q.async(generator);
    const result = asyncGenerator();
    result.then((value: any) => {
      expect(value).toBeUndefined();
    });
    expect(() => asyncGenerator()).not.toThrow();
  });
});