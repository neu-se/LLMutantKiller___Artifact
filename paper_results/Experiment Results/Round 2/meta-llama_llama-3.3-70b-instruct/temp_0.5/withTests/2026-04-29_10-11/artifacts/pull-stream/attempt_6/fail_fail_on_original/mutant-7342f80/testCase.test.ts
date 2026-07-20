import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should throw an error when no done callback is supplied in the original code but not in the mutated code', () => {
    expect(() => drain(() => true)).toThrowError();
  });
});