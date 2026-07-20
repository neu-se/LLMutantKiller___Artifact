import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.async", () => {
  it("should work with a generator that yields a promise", async () => {
    function* generator() {
      yield Promise.resolve(42);
    }
    const asyncGenerator = Q.async(generator);
    const result = await asyncGenerator();
    expect(result).toBeUndefined();
  });
});