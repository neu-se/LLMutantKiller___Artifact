import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull-stream', () => {
  it('should not iterate over arguments with length greater than the actual number of arguments', () => {
    const read = pull(
      function (abort, cb) {
        cb(null, 1);
      },
      function (read) {
        return function (abort, cb) {
          read(abort, function (end, data) {
            if (end) cb(end);
            else cb(null, data);
          });
        };
      },
      function (read) {
        throw new Error('Should not be called');
      }
    );

    expect(() => read(null, () => {})).not.toThrow();
  });
});