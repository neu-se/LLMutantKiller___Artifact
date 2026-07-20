import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call the done callback when the stream ends', (done) => {
    const read = jest.fn((err, cb) => {
      cb(true, null);
    });
    const op = () => true;
    const doneCallback = jest.fn();
    const sink = drain(op, doneCallback);
    sink(read);
    // If the mutation is present, the while loop condition is false when cbed is initially true,
    // so the done callback should not be called
    // If the original code is used, the while loop condition is true when cbed is initially false,
    // so the done callback should be called
    setTimeout(() => {
      expect(doneCallback).toHaveBeenCalledTimes(1);
      done();
    }, 100);
  });
});