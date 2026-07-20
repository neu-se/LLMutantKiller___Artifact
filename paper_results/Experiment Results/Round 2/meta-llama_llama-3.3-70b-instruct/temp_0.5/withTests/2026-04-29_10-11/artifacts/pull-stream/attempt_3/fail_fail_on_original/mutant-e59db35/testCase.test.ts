import { flatten } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";

describe('flatten', () => {
  it('should handle abort correctly', (done) => {
    const source = function (read: any) {
      return function (abort: any, cb: any) {
        if (abort) {
          cb(abort);
        } else {
          cb(null, [1, 2, 3]);
        }
      };
    };

    const stream = flatten()(source);

    stream(true, function (err: any) {
      expect(err).toBe(true);
      done();
    });
  });
});