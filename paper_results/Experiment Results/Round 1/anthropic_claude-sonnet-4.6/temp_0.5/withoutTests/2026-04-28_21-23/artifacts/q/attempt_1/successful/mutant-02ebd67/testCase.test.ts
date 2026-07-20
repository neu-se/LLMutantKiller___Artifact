import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async generator function", () => {
  it("should correctly advance the generator using 'next' verb", async () => {
    // Q.async uses continuer.bind(continuer, "next") to create the callback
    // The mutation changes "next" to "" which would cause generator[""](arg) instead of generator["next"](arg)
    // This test verifies that Q.async works correctly with a generator function
    
    const asyncFn = Q.async(function* () {
      const a = yield Q.resolve(1);
      const b = yield Q.resolve(2);
      return a + b;
    });

    const result = await asyncFn();
    expect(result).toBe(3);
  });
});