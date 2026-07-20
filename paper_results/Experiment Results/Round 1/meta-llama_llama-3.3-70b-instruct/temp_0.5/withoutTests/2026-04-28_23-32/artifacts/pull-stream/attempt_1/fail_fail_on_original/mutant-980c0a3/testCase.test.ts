import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call done with error when end is not true', (done) => {
    const endError = new Error('Test error');
    const doneCallback = jest.fn();
    const read = jest.fn((err, cb) => {
      cb(endError, null);
    });
    const sink = drain(null, doneCallback);
    sink(read);
    expect(doneCallback).toHaveBeenCalledTimes(1);
    expect(doneCallback).toHaveBeenCalledWith(endError);
    done();
  });
});