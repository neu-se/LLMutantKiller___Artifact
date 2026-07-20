import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull', () => {
  it('should handle case 2 correctly', () => {
    const read = pull(
      pull.values([1, 2, 3]),
      (read) => {
        return function (abort, cb) {
          read(abort, function (end, data) {
            if (end) cb(end);
            else cb(null, data);
          });
        };
      },
      (read) => {
        return function (abort, cb) {
          read(abort, function (end, data) {
            if (end) cb(end);
            else cb(null, data);
          });
        };
      }
    );

    let ended = false;
    let data;

    read(null, function (end, d) {
      if (end) ended = true;
      else data = d;
    });

    expect(ended).toBe(false);
    expect(data).toBe(1);

    read(null, function (end, d) {
      if (end) ended = true;
      else data = d;
    });

    expect(ended).toBe(false);
    expect(data).toBe(2);

    read(null, function (end, d) {
      if (end) ended = true;
      else data = d;
    });

    expect(ended).toBe(true);
    expect(data).toBeUndefined();
  });
});