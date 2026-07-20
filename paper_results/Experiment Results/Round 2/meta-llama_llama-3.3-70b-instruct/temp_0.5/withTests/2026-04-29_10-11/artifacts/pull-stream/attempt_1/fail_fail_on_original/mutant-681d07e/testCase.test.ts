import { pull } from '../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull function', () => {
  it('should throw an error when called twice', () => {
    const stream = pull(
      (read) => {
        return function (end, cb) {
          read(end, cb);
        };
      },
      (read) => {
        return function (end, cb) {
          read(end, cb);
        };
      }
    );

    stream(null, () => {});

    expect(() => stream(null, () => {})).toThrowError(TypeError);
  });
});