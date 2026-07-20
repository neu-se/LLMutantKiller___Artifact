import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call the done callback with an error when the read function throws an error', (done) => {
    let readCount = 0;
    const read = jest.fn((err, cb) => {
      readCount++;
      cb(true, null);
    });
    const op = () => false;
    const doneCallback = jest.fn();
    const sink = drain(op, doneCallback);
    sink(read);
    // If the mutation is present, cbed is initially true, so the while loop condition is false,
    // and the read function should not be called again
    // If the original code is used, cbed is initially false, so the while loop condition is true,
    // and the read function should be called again
    setTimeout(() => {
      expect(readCount).toBeGreaterThan(1);
      expect(doneCallback).toHaveBeenCalledTimes(1);
      expect(doneCallback).toHaveBeenCalledWith(true);
      done();
    }, 100);
  });
});