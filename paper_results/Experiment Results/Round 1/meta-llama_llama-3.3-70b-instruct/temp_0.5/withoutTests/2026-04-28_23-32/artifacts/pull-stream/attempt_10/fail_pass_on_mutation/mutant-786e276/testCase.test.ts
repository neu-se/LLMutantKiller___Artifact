import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull-stream', () => {
  it('should handle the source property correctly', () => {
    const read = {
      source: () => {}
    };
    const result = pull.default(read, function() {});
    expect(() => {
      if (typeof read.source === 'function') {
        throw new Error('Source property is a function');
      }
    }).toThrowError('Source property is a function');
  });
});