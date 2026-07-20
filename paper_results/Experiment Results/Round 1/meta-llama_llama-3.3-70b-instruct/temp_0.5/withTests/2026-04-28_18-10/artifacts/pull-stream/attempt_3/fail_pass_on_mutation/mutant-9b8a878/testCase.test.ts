import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull', () => {
  it('should correctly handle multiple arguments', () => {
    const read = pull(
      function (end, cb) {
        if (end) cb(end);
        else cb(null, 1);
      },
      function (read) {
        return function (end, cb) {
          if (end) cb(end);
          else read(end, cb);
        }
      },
      function (read) {
        return function (end, cb) {
          if (end) cb(end);
          else read(end, cb);
        }
      }
    );

    expect(read).toBeInstanceOf(Function);
    expect(() => read(null, (end, data) => {})).not.toThrow();
  });
});