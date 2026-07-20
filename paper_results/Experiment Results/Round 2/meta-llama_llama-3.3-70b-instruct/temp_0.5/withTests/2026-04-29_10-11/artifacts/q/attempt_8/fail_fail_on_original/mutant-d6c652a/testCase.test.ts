const Q = require('./q.js');

describe("q", () => {
  it("should handle the mutation", () => {
    const originalCode = `
      if (!hasStacks) {
        return;
      }
    `;
    const mutatedCode = `
      if (!hasStacks) {}
    `;

    const originalFunction = new Function('hasStacks', originalCode);
    const mutatedFunction = new Function('hasStacks', mutatedCode);

    expect(originalFunction(true)).toBeUndefined();
    expect(mutatedFunction(true)).toBeUndefined();

    expect(originalFunction(false)).toBeUndefined();
    expect(mutatedFunction(false)).toBeUndefined();
  });
});