import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should not call done with the end value when end is an object', (done) => {
    const doneCallback = jest.fn();
    const endValue = {};
    const read = jest.fn((err, cb) => {
      cb(endValue, null);
    });
    const sink = drainModule.default(null, doneCallback);
    sink(read);
    expect(doneCallback).toHaveBeenCalledTimes(1);
    expect(doneCallback).not.toHaveBeenCalledWith(endValue);
    done();
  });
});