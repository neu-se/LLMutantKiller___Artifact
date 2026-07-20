import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call the read function when aborting', () => {
    const readSpy = jest.fn((err, cb) => {
      cb(null, null);
    });
    const sink = drain(null, () => {
      expect(readSpy).toHaveBeenCalledTimes(1);
    });
    sink(readSpy);
    sink.abort();
    expect(readSpy).toHaveBeenCalledTimes(1);
  });
});