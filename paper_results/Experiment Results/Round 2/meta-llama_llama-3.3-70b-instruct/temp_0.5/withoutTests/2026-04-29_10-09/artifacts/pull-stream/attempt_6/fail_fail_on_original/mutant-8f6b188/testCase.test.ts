import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should handle end condition correctly', (done) => {
    const read = jest.fn((err, cb) => {
      cb(false, null);
    });

    const sink = drain(null, (err) => {
      if (err !== null) {
        expect(false).toBe(true); // This should not be reached in the original code
      } else {
        expect(read).toHaveBeenCalledTimes(1);
      }
      done();
    });

    sink(read);
  });
});