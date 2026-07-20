import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call the done callback with the correct error when the stream ends with an error', (done) => {
    let readCount = 0;
    const read = jest.fn((err, cb) => {
      readCount++;
      cb(true, null);
    });
    const op = () => true;
    const doneCallback = jest.fn();
    const sink = drain(op, doneCallback);
    sink(read);
    // If the mutation is present, cbed is initially true, so the while loop condition is false,
    // and the done callback should be called with the error
    // If the original code is used, cbed is initially false, so the while loop condition is true,
    // and the done callback should be called with the error
    setTimeout(() => {
      expect(readCount).toBe(1);
      expect(doneCallback).toHaveBeenCalledTimes(1);
      expect(doneCallback).toHaveBeenCalledWith(true);
      done();
    }, 100);
  });
});