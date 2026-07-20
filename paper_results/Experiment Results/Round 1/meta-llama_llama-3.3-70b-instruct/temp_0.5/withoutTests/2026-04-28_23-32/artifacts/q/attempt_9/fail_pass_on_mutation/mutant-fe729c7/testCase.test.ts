describe("Q", () => {
  it("should work correctly with sparse arrays", () => {
    const array = [1, , 3]; // sparse array
    const callback = (basis: number | undefined, value: number | undefined, index: number, array: (number | undefined)[]) => {
      if (index === 1) {
        expect(value).toBeUndefined();
      }
      return basis + (value || 0);
    };
    const basis = 0;
    const result = array.reduce(callback, basis);
    expect(result).toBe(4);
  });
});