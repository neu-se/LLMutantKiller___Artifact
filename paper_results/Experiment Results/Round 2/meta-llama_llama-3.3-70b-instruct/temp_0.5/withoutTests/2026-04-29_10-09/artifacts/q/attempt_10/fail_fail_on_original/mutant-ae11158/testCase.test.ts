describe("Q.nfapply", () => {
  it("should call the callback with the provided arguments", () => {
    const callback = jest.fn();
    const args = [1, 2, 3];
    Q.nfapply(callback, args);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(...args);
  });
});