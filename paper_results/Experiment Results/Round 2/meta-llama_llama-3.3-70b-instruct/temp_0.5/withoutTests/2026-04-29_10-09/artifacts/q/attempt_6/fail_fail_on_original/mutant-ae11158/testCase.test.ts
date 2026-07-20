describe("Q.nfapply", () => {
  it("should return a promise with a 'then' method", () => {
    const callback = () => {};
    const args = [1, 2, 3];
    const result = Q.nfapply(callback, args);
    expect(typeof result.then).toBe('function');
  });
});