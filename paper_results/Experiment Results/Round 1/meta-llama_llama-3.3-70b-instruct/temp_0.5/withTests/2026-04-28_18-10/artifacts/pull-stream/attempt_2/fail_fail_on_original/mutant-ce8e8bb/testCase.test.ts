import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull.js', () => {
  it('should handle arguments correctly', () => {
    const read = pull(
      (read) => {
        return function (abort, cb) {
          read(abort, cb);
        };
      },
      (read) => {
        return function (abort, cb) {
          read(abort, cb);
        };
      }
    );

    const values = [1, 2, 3];
    let i = 0;
    read(null, function (end, data) {
      if (end) return;
      expect(data).toBe(values[i++]);
    });

    read(null, function (end, data) {
      if (end) return;
      expect(data).toBe(values[i++]);
    });

    read(true, function (end, data) {
      expect(end).toBe(true);
    });
  });
});