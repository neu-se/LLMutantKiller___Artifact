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
      },
      function (read) {
        return function (end, cb) {
          if (end) cb(end);
          else read(end, cb);
        }
      }
    );

    let called = 0;
    const callback = (end, data) => {
      called++;
      if (called === 1) {
        expect(data).toBe(1);
      }
    };

    read(null, callback);
    expect(() => read(null, callback)).toThrowError('partial sink should only be called once!');
  });
});