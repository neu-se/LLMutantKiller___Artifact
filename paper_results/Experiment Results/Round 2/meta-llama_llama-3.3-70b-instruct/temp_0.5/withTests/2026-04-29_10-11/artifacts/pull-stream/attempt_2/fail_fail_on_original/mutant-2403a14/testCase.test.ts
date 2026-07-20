import { through } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js';

describe('through', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const read = through(null, (abort: any) => {
      if (abort !== null && abort !== true) {
        throw new Error('Expected abort to be null or true');
      }
    });

    expect(() => read(null, () => {})).not.toThrow();
    expect(() => read(true, () => {})).not.toThrow();
    expect(() => read(new Error(), () => {})).toThrowError('Expected abort to be null or true');
  });
});