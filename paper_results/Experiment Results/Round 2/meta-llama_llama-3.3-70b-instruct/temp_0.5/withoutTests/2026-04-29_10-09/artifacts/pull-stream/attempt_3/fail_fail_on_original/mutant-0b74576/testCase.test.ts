import tester from '../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js';

describe('tester function', () => {
  it('should return the original value when id function is called', () => {
    const result = tester({})(undefined);
    expect(result).toBeUndefined();
  });
});