import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should handle end condition correctly', (done) => {
    const read = jest.fn((err, cb) => {
      cb(false, null);
    });

    const sink = drain(null, (err: any) => {
      expect(err).toBe(false);
      done();
    });

    sink(read);
  });
});