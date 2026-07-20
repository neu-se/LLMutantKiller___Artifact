describe('tester function', () => {
  it('should return a function that calls the test function with data', () => {
    const testFunction = (data: any) => data;
    const testerFunction = require('../../../../../../../../../../subject_repositories/pull-stream/util/tester.js').tester(testFunction);
    const data = 'test data';
    const result = testerFunction(data);
    expect(result).toBe(data);
  });
});