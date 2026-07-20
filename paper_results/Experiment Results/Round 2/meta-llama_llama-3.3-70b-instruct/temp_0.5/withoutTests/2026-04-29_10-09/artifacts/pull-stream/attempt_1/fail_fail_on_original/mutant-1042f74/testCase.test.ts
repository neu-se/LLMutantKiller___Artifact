import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should not enter an infinite loop when cbed is initially false', (done) => {
    const read = jest.fn((err, cb) => {
      cb(null, 'data');
    });
    const op = () => true;
    const doneCallback = jest.fn();
    const sink = drain(op, doneCallback);
    sink(read);
    // If the mutation is present, this test will timeout or hang indefinitely
    // If the original code is used, the doneCallback should be called
    setTimeout(() => {
      expect(doneCallback).toHaveBeenCalledTimes(1);
      expect(doneCallback).toHaveBeenCalledWith(null);
      done();
    }, 100);
  });
});