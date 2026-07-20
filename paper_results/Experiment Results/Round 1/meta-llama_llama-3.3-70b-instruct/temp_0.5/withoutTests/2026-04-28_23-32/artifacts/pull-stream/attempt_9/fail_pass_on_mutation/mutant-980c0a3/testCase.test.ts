import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call done with null when end is an object that is not true', (done) => {
    const doneCallback = jest.fn();
    const read = jest.fn((err, cb) => {
      cb({}, null);
    });
    const sink = drainModule.default(null, doneCallback);
    sink(read);
    expect(doneCallback).toHaveBeenCalledTimes(1);
    expect(doneCallback).toHaveBeenCalledWith({});
    done();
  });
});