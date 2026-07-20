import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should not call the read function twice when cbed is initially false', (done) => {
    let readCount = 0;
    const read = jest.fn((err, cb) => {
      readCount++;
      cb(null, 'data');
    });
    const op = () => false;
    const doneCallback = jest.fn();
    const sink = drain(op, doneCallback);
    sink(read);
    // If the mutation is present, cbed is initially true, so the while loop condition is false,
    // and the read function should be called twice
    // If the original code is used, cbed is initially false, so the while loop condition is true,
    // and the read function should not be called twice
    setTimeout(() => {
      expect(readCount).toBe(1);
      done();
    }, 100);
  });
});