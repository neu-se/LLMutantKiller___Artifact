import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call done callback with error when end is not true', (done) => {
    const error = new Error('Test error');
    const read = jest.fn((err, cb) => {
      cb(error, null);
    });
    const doneCallback = jest.fn();
    const sink = drain(null, doneCallback);
    sink(read);
    setTimeout(() => {
      expect(doneCallback).toHaveBeenCalledTimes(1);
      expect(doneCallback).toHaveBeenCalledWith(error);
      done();
    }, 0);
  });
});