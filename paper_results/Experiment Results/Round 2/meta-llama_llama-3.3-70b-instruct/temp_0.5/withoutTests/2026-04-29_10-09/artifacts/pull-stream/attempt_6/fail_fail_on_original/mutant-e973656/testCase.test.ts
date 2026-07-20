import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should handle end condition correctly', (done) => {
    let called = false;
    const read = jest.fn((err, cb) => {
      if (err) {
        cb(true, null);
      } else {
        cb(null, null);
      }
    });

    const sink = drain(null, (err: any) => {
      expect(err).toBeNull();
      called = true;
      done();
    });

    sink(read);
    read.mock.calls[0][1](true, null);
  });
});