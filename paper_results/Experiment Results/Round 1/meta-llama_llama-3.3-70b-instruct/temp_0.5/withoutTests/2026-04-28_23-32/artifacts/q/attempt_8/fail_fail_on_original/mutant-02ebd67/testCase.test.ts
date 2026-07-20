import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.async", () => {
  it("should work correctly with the original code and fail with the mutated code", () => {
    function* generator() {
      yield Q.resolve(42);
    }
    const asyncGenerator = Q.async(generator);
    const result = asyncGenerator();
    expect(result).not.toBeNull();
    const continuer = (asyncGenerator as any).continuer;
    expect(continuer).toBeInstanceOf(Function);
    expect(() => continuer("next", null)).not.toThrow();
  });
});