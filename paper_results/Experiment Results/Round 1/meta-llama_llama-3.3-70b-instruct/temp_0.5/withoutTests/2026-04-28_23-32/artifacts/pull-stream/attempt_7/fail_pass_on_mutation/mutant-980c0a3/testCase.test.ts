import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should not call done with error when end is true', (done) => {
    const doneCallback = jest.fn();
    const read = jest.fn((err, cb) => {
      cb(true, null);
    });
    const sink = drainModule.default(null, doneCallback);
    sink(read);
    expect(doneCallback).toHaveBeenCalledTimes(1);
    expect(doneCallback).toHaveBeenCalledWith(null);
    const read2 = jest.fn((err, cb) => {
      cb({}, null);
    });
    const sink2 = drainModule.default(null, doneCallback);
    sink2(read2);
    expect(doneCallback).toHaveBeenCalledTimes(2);
    expect(doneCallback).toHaveBeenNthCalledWith(2, {});
    done();
  });
});