import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async generator behavior", () => {
  it("should correctly advance a generator using 'next' verb to get yielded values", async () => {
    // The mutation changes "next" to "" in the continuer binding
    // This means the generator's verb will be "" instead of "next"
    // which will cause generator[""]() to fail or not advance properly
    
    const asyncFn = Q.async(function* () {
      const a = yield Q.resolve(1);
      const b = yield Q.resolve(2);
      return a + b;
    });

    const result = await asyncFn();
    expect(result).toBe(3);
  });
});