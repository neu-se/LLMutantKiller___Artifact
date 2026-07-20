import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call the read function when aborting', (done) => {
    const readSpy = jest.fn();
    const sink = drain(null, null);
    sink(readSpy);
    sink.abort(null, () => {
      expect(readSpy).toHaveBeenCalledTimes(1);
      done();
    });
    // Introduce a small delay to allow the readSpy to be called
    setTimeout(() => {
      expect(readSpy).toHaveBeenCalledTimes(1);
      done();
    }, 10);
  });
});