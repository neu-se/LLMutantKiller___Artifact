describe('tester function', () => {
  it('should return the input when test is not an object with a test function', () => {
    const id = (e: any) => e;
    const test = 'not an object';
    const result = (test: any) => {
      return 'object' === typeof test && 'function' === typeof test.test 
        ? function (data: any) { return test.test(data) } 
        : id;
    };
    const input = 'test input';
    expect(result(test)(input)).toBe(input);

    const mutatedId = (e: any) => {};
    const mutatedResult = (test: any) => {
      return 'object' === typeof test && 'function' === typeof test.test 
        ? function (data: any) { return test.test(data) } 
        : mutatedId;
    };
    expect(() => mutatedResult(test)(input)).toThrowError();
  });
});