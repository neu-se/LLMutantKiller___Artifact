describe('pull', () => {
  it('should throw an error when s is an object but not a function and does not have a sink function', () => {
    const read = () => {};
    const s = {};
    expect(() => {
      // @ts-ignore
      pull(read, s);
    }).toThrowError();
  });
});