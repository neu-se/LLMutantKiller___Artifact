describe("Q", () => {
  it("should work correctly with sparse arrays", () => {
    const array = [1, , 3]; // sparse array
    const callback = (basis: number, value: number) => basis + value;
    const basis = 0;
    const result = array.reduce(callback, basis);
    expect(result).toBe(4);
    expect(Object.keys(array).length).toBe(3); // Check if the array has 3 keys
  });
});