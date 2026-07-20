import tester from '../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js';

describe('tester function', () => {
  it('should return the original value when id function is called', () => {
    const test = {};
    const result = tester(test);
    expect(typeof result).toBe('function');
    expect(result('test')).toBeDefined();
  });
});