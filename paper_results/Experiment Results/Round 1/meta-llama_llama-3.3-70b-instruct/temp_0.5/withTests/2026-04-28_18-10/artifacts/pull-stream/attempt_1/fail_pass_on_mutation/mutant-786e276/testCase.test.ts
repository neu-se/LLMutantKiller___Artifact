import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull-stream', () => {
  it('should throw an error when read.source is not a function', () => {
    expect(() => {
      pull({
        source: {}
      });
    }).toThrowError(TypeError);
  });
});