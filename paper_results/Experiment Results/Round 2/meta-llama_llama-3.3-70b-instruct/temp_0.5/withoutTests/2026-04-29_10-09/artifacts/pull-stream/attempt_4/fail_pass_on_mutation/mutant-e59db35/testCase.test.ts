import flatten from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";

describe('flatten', () => {
  it('should handle abort and error correctly', (done) => {
    const read = jest.fn((abort, cb) => {
      if (abort) {
        cb(false, null); // simulate no error after abort
      } else {
        cb(null, null); // simulate successful read
      }
    });

    const stream = flatten()(read);
    stream(true, (err: any) => {
      expect(read).toHaveBeenCalledTimes(1);
      expect(read).toHaveBeenNthCalledWith(1, true, expect.any(Function));
      done();
    });
  });
});