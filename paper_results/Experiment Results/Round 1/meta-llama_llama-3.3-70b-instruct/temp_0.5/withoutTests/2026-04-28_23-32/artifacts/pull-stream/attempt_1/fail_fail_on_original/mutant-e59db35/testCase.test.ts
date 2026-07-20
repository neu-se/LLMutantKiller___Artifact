import { flatten } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";

describe('flatten', () => {
  it('should handle abort and error correctly', (done) => {
    const stream = flatten();
    const read = jest.fn((abort, cb) => {
      if (abort) {
        cb(true, null);
      } else {
        cb(null, [1, 2, 3]);
      }
    });
    const cb = jest.fn((err, data) => {
      if (err) {
        expect(err).toBe(true);
        done();
      } else {
        expect(data).toBe(1);
        // Simulate an abort
        stream(null, (abort, cb) => {
          if (abort) {
            cb(true, null);
          } else {
            cb(null, null);
          }
        })(true, (err) => {
          if (err) {
            expect(err).toBe(true);
            done();
          }
        });
      }
    });
    stream(read)(null, cb);
  });
});