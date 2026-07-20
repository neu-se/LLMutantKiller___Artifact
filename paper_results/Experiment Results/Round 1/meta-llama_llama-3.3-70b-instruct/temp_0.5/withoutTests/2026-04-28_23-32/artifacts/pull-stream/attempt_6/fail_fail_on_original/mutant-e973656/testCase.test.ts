import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should not call done callback with null when end is false', (done) => {
    const read = jest.fn((err, cb) => {
      cb(false, null);
    });
    const doneCallback = jest.fn();
    const sink = drain(null, doneCallback);
    sink(read);
    setTimeout(() => {
      expect(doneCallback).toHaveBeenCalledTimes(0);
      done();
    }, 100);
  });
});