import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull', () => {
  it('should handle read with source property correctly', () => {
    const read = {
      source: function () {
        return function (end, cb) {
          cb(null, 1);
        };
      },
    };
    const result = pull(read);
    expect(typeof result).toBe('function');
  });
});