import { pull } from '../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull function', () => {
  it('should pass with the original code and fail with the mutated code', () => {
    const values = [1, 2, 3, 4, 5];
    const read = pull(
      pull.values(values),
      (read) => {
        return function (end, cb) {
          if (end === true) cb(end);
          else if (end) cb(end);
          else read(end, cb);
        };
      },
      (read) => {
        return function (end, cb) {
          if (end === true) cb(end);
          else if (end) cb(end);
          else read(end, cb);
        };
      }
    );

    const result = [];
    read(null, (end, data) => {
      if (end) return;
      result.push(data);
    });
    read(null, (end, data) => {
      if (end) return;
      result.push(data);
    });
    read(null, (end, data) => {
      if (end) return;
      result.push(data);
    });
    read(null, (end, data) => {
      if (end) return;
      result.push(data);
    });
    read(null, (end, data) => {
      if (end) return;
      result.push(data);
    });

    expect(result.length).toBe(5);
  });
});