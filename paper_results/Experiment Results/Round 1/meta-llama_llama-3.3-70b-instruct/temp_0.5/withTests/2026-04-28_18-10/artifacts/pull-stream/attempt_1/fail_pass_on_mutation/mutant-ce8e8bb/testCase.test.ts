import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull.js', () => {
  it('should throw an error when a non-function is passed as an argument', () => {
    expect(() => pull(1)).toThrowError();
  });
});