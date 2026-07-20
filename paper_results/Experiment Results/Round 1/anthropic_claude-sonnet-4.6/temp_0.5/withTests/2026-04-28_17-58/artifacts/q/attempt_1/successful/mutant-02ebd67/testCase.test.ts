import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with generator functions", () => {
  it("should correctly iterate a generator by calling 'next' on it", () => {
    // Q.async wraps a generator function and uses continuer.bind(continuer, "next")
    // The mutation changes "next" to "", which would cause generator[""]() to be called
    // instead of generator["next"](), breaking the async iteration
    const asyncFn = Q.async(function* () {
      const a = yield Q(1);
      const b = yield Q(2);
      return a + b;
    });

    return asyncFn().then((result: number) => {
      expect(result).toBe(3);
    });
  });
});