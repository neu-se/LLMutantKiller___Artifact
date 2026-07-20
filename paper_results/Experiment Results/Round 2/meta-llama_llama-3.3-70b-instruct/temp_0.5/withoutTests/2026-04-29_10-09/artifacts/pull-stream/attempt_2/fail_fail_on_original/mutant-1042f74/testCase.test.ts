import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should not hang indefinitely when cbed is initially true in the mutated code', (done) => {
    const read = jest.fn((err, cb) => {
      cb(null, 'data');
    });
    const op = () => false;
    const doneCallback = jest.fn();
    const sink = drain(op, doneCallback);
    sink(read);
    // If the mutation is present, cbed is initially true, so the while loop condition should be false
    // and the test should pass
    // If the original code is used, cbed is initially false, so the while loop condition should be true
    // and the test should fail because doneCallback is not called
    setTimeout(() => {
      expect(doneCallback).not.toHaveBeenCalled();
      done();
    }, 100);
  });
});