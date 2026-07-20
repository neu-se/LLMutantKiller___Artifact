describe('tester function', () => {
  it('should return a function that calls test.test when test is an object with a test method', () => {
    const testObject = {
      test: jest.fn(),
    };
    const tester = require('../../../../../../../../subject_repositories/pull-stream/util/tester.js');
    const result = tester(testObject);
    result('data');
    expect(testObject.test).toHaveBeenCalledTimes(1);
    expect(testObject.test).toHaveBeenCalledWith('data');
  });
});