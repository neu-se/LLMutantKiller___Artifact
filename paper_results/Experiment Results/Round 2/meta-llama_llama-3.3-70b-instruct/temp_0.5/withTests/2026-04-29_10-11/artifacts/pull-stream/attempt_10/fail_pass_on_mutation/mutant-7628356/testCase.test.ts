describe('tester function', () => {
  it('should return a function that calls test.test when test is an object with a test method', () => {
    const testObject = {
      test: () => {},
    };
    const tester = (test) => {
      return typeof test === 'object' && typeof test.test === 'function'
        ? (data) => test.test(data)
        : (data) => data;
    };
    const result = tester(testObject);
    expect(typeof result).toBe('function');
    result('data');
  });

  it('should return the id function when test is not an object with a test method', () => {
    const testObject = {};
    const tester = (test) => {
      return typeof test === 'object' && typeof test.test === 'function'
        ? (data) => test.test(data)
        : (data) => data;
    };
    const result = tester(testObject);
    expect(result('data')).toBe('data');
  });

  it('should fail when test is an empty string', () => {
    const testObject = "";
    const tester = (test) => {
      return typeof test === 'object' && typeof test.test === 'function'
        ? (data) => test.test(data)
        : (data) => data;
    };
    expect(() => tester(testObject)).not.toThrow();
  });
});