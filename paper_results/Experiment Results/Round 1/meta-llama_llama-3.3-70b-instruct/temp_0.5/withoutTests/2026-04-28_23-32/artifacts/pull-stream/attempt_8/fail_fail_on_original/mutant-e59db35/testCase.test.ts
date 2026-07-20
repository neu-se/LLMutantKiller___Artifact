import flatten from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";

describe('flatten', () => {
  it('should handle abort and error correctly', (done) => {
    const stream = flatten();
    const read = jest.fn((abort: boolean, cb: (err: any, data: any) => void) => {
      if (abort) {
        cb(null, null);
      } else {
        cb(null, [1, 2, 3]);
      }
    });
    const cb = jest.fn((err: any, data: any) => {
      if (err) {
        expect(err).toBe(null);
        done();
      } else {
        expect(data).toBe(1);
        stream(read)(true, (err: any, data: any) => {
          expect(err).toBe(null);
          done.fail('Expected an error');
        });
      }
    });
    stream(read)(true, cb);
  });
});