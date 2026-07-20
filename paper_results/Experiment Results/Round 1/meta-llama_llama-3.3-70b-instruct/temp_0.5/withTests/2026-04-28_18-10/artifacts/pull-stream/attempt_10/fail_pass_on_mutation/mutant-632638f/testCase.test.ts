describe('prop function', () => {
  it('should return a function that returns the value of the given key', () => {
    const prop = (key: string) => (data: any) => data[key];
    const obj = { a: 1, b: 2 };
    const func = prop('a');
    expect(func(obj)).toBe(1);
  });

  it('should return the correct value for the given key', () => {
    const prop = (key: string) => (data: any) => data[key];
    const obj = { a: 1, b: 2 };
    const func = prop('a');
    expect(func(obj)).toEqual(1);
  });
});