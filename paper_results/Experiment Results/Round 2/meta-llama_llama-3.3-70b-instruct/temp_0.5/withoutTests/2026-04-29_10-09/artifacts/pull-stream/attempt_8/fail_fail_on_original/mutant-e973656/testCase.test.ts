import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should handle end condition correctly', (done) => {
    const read = jest.fn((err, cb) => {
      cb(null, null);
    });

    const sink = drain(null, (err: any) => {
      expect(err).toBeNull();
      done();
    });

    sink(read);
    read.mock.calls[0][1](false, null);
  });
});