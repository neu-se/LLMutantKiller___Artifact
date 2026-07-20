import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should not hang indefinitely when cbed is initially false', (done) => {
    let readCount = 0;
    const read = jest.fn((err, cb) => {
      readCount++;
      cb(null, 'data');
    });
    const op = () => true;
    const doneCallback = jest.fn();
    const sink = drain(op, doneCallback);
    sink(read);
    // If the mutation is present, cbed is initially true, so the while loop condition is false,
    // and the test should hang indefinitely
    // If the original code is used, cbed is initially false, so the while loop condition is true,
    // and the test should not hang indefinitely
    setTimeout(() => {
      expect(readCount).toBeGreaterThan(0);
      expect(doneCallback).toHaveBeenCalledTimes(1);
      done();
    }, 100);
  });
});