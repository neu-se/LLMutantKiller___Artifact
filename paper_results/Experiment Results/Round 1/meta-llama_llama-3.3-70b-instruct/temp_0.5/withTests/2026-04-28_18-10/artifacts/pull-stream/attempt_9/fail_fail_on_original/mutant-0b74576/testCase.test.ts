describe('tester function', () => {
  it('should pass on the original code and fail on the mutated code', () => {
    const idFunction = (e: any) => e;
    const tester = require('../../../../../../subject_repositories/pull-stream/util/tester.js');
    const testFunction = tester(idFunction);
    const data = 'test data';
    const result = testFunction(data);
    if (result !== data) {
      throw new Error('Test failed');
    }
  });
});