import { pull } from '../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull', () => {
  it('should throw an error when called with a function and no arguments', () => {
    expect(() => pull(() => {})).toThrowError();
  });
});