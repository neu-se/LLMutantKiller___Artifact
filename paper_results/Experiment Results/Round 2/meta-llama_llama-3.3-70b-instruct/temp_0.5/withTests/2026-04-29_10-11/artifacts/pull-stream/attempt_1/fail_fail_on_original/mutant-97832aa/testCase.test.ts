import { pull } from '../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull', () => {
  it('should throw an error when a non-function and non-object is passed as the second argument', () => {
    expect(() => pull(() => {}, null)).toThrowError();
  });
});