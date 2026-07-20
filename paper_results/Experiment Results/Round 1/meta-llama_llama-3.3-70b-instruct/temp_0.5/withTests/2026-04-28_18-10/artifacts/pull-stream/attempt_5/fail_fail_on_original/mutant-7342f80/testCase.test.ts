import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should call the done callback when the stream ends', () => {
    const doneCallback = jest.fn();
    const read = jest.fn((end, cb) => {
      cb(null, 'data');
    });
    const sink = drain(() => true, doneCallback);
    sink(read);
    expect(doneCallback).toHaveBeenCalledTimes(1);
  });
});