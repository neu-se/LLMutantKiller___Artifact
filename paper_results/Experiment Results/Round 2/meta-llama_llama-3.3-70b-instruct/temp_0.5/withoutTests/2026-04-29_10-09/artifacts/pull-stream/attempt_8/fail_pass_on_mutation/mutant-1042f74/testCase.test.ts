import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call the done callback when the stream ends', (done) => {
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
    // and the done callback should not be called
    // If the original code is used, cbed is initially false, so the while loop condition is true,
    // and the done callback should be called
    setTimeout(() => {
      expect(readCount).toBe(1);
      expect(doneCallback).toHaveBeenCalledTimes(1);
      expect(doneCallback).toHaveBeenCalledWith(null);
      done();
    }, 100);
  });
});