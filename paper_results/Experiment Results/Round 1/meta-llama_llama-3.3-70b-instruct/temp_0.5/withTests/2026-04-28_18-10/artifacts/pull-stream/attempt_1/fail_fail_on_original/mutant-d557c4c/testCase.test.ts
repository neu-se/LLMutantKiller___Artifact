import { pull } from '../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull.js', () => {
  it('should throw an error when s is an object but not a function', () => {
    expect(() => {
      pull(
        () => {},
        { sink: () => {}, source: () => {} }
      );
    }).toThrowError(TypeError);
  });
});