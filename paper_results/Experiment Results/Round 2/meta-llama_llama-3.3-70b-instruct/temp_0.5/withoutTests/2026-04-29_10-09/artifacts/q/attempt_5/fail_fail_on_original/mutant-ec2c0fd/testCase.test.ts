describe("Q.async", () => {
  it("should handle ES6 generators correctly", () => {
    function* generator() {
      yield Promise.resolve(1);
    }

    const asyncGenerator = Q.async(generator);
    const promise = asyncGenerator();

    expect(typeof promise.then).toBe('function');
  });
});