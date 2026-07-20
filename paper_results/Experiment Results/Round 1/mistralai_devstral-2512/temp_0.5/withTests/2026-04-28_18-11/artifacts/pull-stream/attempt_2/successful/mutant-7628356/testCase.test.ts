const tester = require("../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js");

describe('tester function behavior', () => {
  it('should return a function when test is an object with a test method', () => {
    const testObj = {
      test: (data: any) => data
    };
    const result = tester(testObj);
    expect(typeof result).toBe('function');
    expect(result('input')).toBe('input');
  });
});