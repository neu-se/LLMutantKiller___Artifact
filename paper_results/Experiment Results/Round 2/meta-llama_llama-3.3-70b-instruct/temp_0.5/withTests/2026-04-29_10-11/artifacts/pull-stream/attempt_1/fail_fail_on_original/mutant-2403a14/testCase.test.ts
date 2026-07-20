import { through } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js';

describe('through', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const read = through(null, (abort: any) => {
      if (abort === true) throw new Error('Expected abort to be null or an error');
    });

    expect(() => read(true, () => {})).toThrowError('Expected abort to be null or an error');
  });
});