import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should handle end condition correctly', (done) => {
    const readSpy = jest.fn((err, cb) => {
      cb(true, null);
    });
    const doneSpy = jest.fn();
    const sink = drain(null, doneSpy);
    sink(readSpy);
    expect(readSpy).toHaveBeenCalledTimes(1);
    expect(doneSpy).toHaveBeenCalledTimes(1);
    expect(doneSpy).toHaveBeenCalledWith(null);
    done();
  });
});