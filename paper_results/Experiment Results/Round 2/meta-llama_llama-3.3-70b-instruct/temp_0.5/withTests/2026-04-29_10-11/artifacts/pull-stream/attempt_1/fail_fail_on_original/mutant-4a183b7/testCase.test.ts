import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull-stream', () => {
  it('should throw an error when read.source is a function but not called', () => {
    const read = {
      source: () => {},
    };

    expect(() => pull(read, () => {})).toThrowError('read.source should be called');
  });
});