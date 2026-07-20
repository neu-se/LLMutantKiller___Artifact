describe("Q.async", () => {
  it("should handle ES6 generators correctly", () => {
    const Q = require('../../../../q');
    function* generator() {
      yield Promise.resolve(1);
    }

    const asyncGenerator = Q.async(generator);
    const promise = asyncGenerator();

    expect(promise).toBeInstanceOf(Promise);
  });
});