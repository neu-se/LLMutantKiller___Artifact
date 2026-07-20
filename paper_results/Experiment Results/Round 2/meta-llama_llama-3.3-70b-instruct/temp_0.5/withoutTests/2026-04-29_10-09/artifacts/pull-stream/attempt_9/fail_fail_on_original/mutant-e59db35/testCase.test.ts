import flatten from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";

describe('flatten', () => {
  it('should handle abort and error correctly', (done) => {
    const read = jest.fn((abort, cb) => {
      if (abort) {
        cb(true, null); // simulate error after abort
      } else {
        cb(null, null); // simulate successful read
      }
    });

    const stream = flatten()(read);
    let called = false;
    stream(true, (err: any) => {
      expect(read).toHaveBeenCalledTimes(1);
      expect(read).toHaveBeenNthCalledWith(1, true, expect.any(Function));
      expect(err).toBe(true);
      called = true;
    });

    stream(true, (err: any) => {
      if (called) {
        expect(false).toBe(true);
      }
    });

    setTimeout(() => {
      expect(called).toBe(true);
      done();
    }, 10);
  });
});