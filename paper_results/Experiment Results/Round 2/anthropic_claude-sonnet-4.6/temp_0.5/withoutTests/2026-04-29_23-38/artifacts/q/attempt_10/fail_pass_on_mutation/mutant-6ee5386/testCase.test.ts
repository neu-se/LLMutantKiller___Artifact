import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async threw tracking", () => {
  it("should correctly handle generator that returns a value", async () => {
    const asyncFn = Q.async(function* () {
      const a = yield Q.resolve(1);
      const b = yield Q.resolve(2);
      return a + b;
    });

    const result = await asyncFn();
    // With threw=true (original): correctly returns 3
    // With threw=false (mutated): may not correctly track thrown state
    expect(result).toBe(3);
  });
});