import flatten from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";

describe('flatten', () => {
  it('should handle abort and error correctly', (done) => {
    const stream = flatten();
    const read = jest.fn((abort: any, cb: any) => {
      if (abort) {
        cb(null, null);
      } else {
        cb(null, [1, 2, 3]);
      }
    });
    const cb = jest.fn((err: any, data: any) => {
      if (err) {
        done();
      } else {
        expect(data).toBe(1);
        stream(true, (err: any, data: any) => {
          if (err) {
            done();
          } else {
            stream(false, (err: any, data: any) => {
              expect(err).toBe(null);
              done();
            });
          }
        });
      }
    });
    stream(read)(false, cb);
    stream(read)(true, (err: any, data: any) => {
      if (err) {
        done();
      } else {
        expect(err).toBe(null);
      }
    });
  });
});