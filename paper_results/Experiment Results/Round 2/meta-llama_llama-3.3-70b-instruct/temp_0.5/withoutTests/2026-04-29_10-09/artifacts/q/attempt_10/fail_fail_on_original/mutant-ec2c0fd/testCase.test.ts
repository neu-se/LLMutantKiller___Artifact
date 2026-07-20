describe("Q.async", () => {
  it("should handle ES6 generators correctly", () => {
    const Q = require('./q.js');
    function* generator() {
      yield Promise.resolve(1);
    }

    const asyncGenerator = Q.async(generator);
    const promise = asyncGenerator();

    expect(promise.then).toBeDefined();
    expect(asyncGenerator()).toThrowError();
  });
});