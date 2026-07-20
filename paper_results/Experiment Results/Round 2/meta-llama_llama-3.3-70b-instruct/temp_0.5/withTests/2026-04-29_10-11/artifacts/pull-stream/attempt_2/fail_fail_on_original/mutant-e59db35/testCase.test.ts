import { flatten } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";

describe('flatten', () => {
  it('should handle abort correctly', (done) => {
    const stream = flatten()(function (read) {
      return function (abort, cb) {
        if (abort) {
          cb(abort);
        } else {
          read(null, function (end, data) {
            if (end) {
              cb(end);
            } else {
              cb(null, [1, 2, 3]);
            }
          });
        }
      };
    });

    stream(true, function (err) {
      expect(err).toBe(true);
      done();
    });
  });
});