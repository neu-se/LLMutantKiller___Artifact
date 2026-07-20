import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call the read function when aborting', (done) => {
    const readSpy = jest.fn((err, cb) => {
      cb(null, null);
    });
    const sink = drain(null, null);
    sink(readSpy);
    sink.abort(null, () => {
      expect(readSpy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});