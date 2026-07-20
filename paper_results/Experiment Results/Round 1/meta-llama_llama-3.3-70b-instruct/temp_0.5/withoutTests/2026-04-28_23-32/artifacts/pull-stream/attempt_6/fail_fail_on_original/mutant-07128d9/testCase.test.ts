import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should handle end condition correctly', (done) => {
    const read = jest.fn((err, cb) => {
      cb(false, null);
    });
    const doneCallback = jest.fn();
    const sink = drain(null, doneCallback);
    sink(read);
    expect(read).toHaveBeenCalledTimes(1);
    expect(doneCallback).not.toHaveBeenCalled();
    done();
  });
});