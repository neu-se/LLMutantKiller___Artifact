import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should handle end condition correctly', (done) => {
    const read = jest.fn((err, cb) => {
      cb(true, null);
    });

    const sink = drain(null, (err) => {
      if (err === null) {
        expect(read).toHaveBeenCalledTimes(1);
        expect(read).toHaveBeenCalledWith(null, expect.any(Function));
      } else {
        expect(err).not.toBeNull();
      }
      done();
    });

    sink(read);
    sink(read);
  });
});