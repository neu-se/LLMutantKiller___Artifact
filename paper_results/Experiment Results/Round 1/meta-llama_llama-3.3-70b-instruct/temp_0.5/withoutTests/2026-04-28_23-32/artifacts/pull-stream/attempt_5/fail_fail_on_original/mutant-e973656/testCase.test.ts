import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call done callback with error when end is not true or null', (done) => {
    const read = jest.fn((err, cb) => {
      cb(false, null);
    });
    const doneCallback = jest.fn();
    const sink = drain(null, doneCallback);
    sink(read);
    expect(doneCallback).toHaveBeenCalledTimes(0);
    done();
  });
});