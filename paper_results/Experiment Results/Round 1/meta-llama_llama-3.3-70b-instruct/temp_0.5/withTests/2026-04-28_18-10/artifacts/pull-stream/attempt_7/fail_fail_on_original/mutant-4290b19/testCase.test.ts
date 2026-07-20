import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull function', () => {
  it('should handle the mutation correctly', () => {
    const read = pull(
      function (end, cb) {
        cb(null, 1);
      },
      function (read) {
        return function (end, cb) {
          read(end, cb);
        };
      }
    );
    read(null, (end, data) => {
      if (end === true) {
        throw new Error('Unexpected end');
      }
    });
    expect(() => read(null, (end, data) => {
      if (end === true) {
        throw new Error('Unexpected end');
      }
    })).toThrowError(TypeError);
  });
});