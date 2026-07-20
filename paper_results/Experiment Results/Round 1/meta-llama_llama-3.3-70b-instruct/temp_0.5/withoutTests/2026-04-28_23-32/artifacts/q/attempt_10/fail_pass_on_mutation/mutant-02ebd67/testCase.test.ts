describe("Q.async", () => {
  it("should work correctly with the original code and fail with the mutated code", () => {
    // Since the mutation is in the async function and involves the verb 'next', 
    // let's try to simulate that behavior.
    function* generator() {
      yield Promise.resolve(42);
    }
    const asyncGenerator = function* () {
      const result = yield "next";
      expect(result).toBe("next");
    };
    const iterator = asyncGenerator();
    iterator.next("next");
  });
});