import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull-stream', () => {
  it('should handle the source property correctly', () => {
    const read = {
      source: 'string'
    };
    expect(() => pull.default(read)).toThrowError(TypeError);
  });
});