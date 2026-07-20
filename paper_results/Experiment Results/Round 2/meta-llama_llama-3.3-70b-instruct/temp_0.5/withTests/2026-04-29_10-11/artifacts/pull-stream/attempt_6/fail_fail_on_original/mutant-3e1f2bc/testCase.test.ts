import { pull } from '../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull function', () => {
  it('should throw an error when a non-function is passed as the first argument and a non-object is passed as the second argument', () => {
    expect(() => pull('string', 'string')).toThrowError();
  });
});