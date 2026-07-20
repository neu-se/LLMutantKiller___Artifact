import flatten from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";

describe('flatten', () => {
  it('should handle abort and error correctly', (done) => {
    const read = jest.fn((abort, cb) => {
      if (abort) {
        cb(false, null); // simulate no error after abort
      } else {
        cb(true, null); // simulate error
      }
    });

    const stream = flatten()(read);
    stream(true, (err: any) => {
      expect(read).toHaveBeenCalledTimes(2);
      expect(read).toHaveBeenNthCalledWith(1, true, expect.any(Function));
      expect(read).toHaveBeenNthCalledWith(2, true, expect.any(Function));
      done();
    });
  });
});