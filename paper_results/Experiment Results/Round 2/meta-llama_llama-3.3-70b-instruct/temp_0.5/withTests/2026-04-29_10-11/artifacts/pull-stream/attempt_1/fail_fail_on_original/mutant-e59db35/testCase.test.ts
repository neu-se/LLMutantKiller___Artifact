import { flatten } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";

describe('flatten', () => {
  it('should handle abort correctly', (done) => {
    const read = flatten()(function (abort, cb) {
      if (abort) {
        cb(abort);
      } else {
        cb(null, [1, 2, 3]);
      }
    });

    read(true, function (err) {
      expect(err).toBe(true);
      done();
    });
  });
});