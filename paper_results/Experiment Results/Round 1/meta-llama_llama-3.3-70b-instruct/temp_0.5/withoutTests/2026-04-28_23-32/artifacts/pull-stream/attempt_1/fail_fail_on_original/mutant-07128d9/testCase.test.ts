import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should handle error correctly', (done) => {
    const error = new Error('Test error');
    const read = jest.fn((err, cb) => {
      cb(true, error);
    });
    const doneCallback = jest.fn();
    drain(null, doneCallback)(read);
    expect(doneCallback).toHaveBeenCalledTimes(1);
    expect(doneCallback).toHaveBeenCalledWith(error);
    done();
  });
});