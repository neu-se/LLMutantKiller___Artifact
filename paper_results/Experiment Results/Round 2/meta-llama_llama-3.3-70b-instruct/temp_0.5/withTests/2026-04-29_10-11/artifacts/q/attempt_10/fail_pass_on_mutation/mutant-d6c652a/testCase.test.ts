describe("q", () => {
  it("should handle the mutation", () => {
    const hasStacks = false;
    const originalCode = `
      if (!hasStacks) {
        return;
      }
      return 1;
    `;
    const mutatedCode = `
      if (!hasStacks) {}
      return 1;
    `;

    const originalFunction = new Function('hasStacks', originalCode);
    const mutatedFunction = new Function('hasStacks', mutatedCode);

    expect(originalFunction(hasStacks)).toBeUndefined();
    expect(mutatedFunction(hasStacks)).toBe(1);
  });
});