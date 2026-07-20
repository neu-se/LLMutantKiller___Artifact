import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should call the done callback when the stream ends', (done) => {
    const read = jest.fn((end, cb) => {
      if (end === true) {
        cb(null);
      } else {
        cb(null, 'data');
      }
    });
    const doneCallback = jest.fn();
    const sink = drain(() => true, doneCallback);
    sink(read);
    read(true, () => {
      expect(doneCallback).toHaveBeenCalledTimes(1);
      done();
    });
    expect(doneCallback).toHaveBeenCalledTimes(1);
  });
});