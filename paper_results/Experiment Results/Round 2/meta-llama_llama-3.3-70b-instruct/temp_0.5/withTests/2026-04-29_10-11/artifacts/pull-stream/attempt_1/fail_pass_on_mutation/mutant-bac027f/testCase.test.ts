import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull', () => {
  it('should throw an error when read has no source property', () => {
    expect(() => pull({})).toThrowError(TypeError);
  });
});