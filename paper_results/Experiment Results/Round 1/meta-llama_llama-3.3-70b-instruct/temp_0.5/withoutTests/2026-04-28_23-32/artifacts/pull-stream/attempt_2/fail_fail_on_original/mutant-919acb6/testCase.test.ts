import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should handle end condition correctly', (done) => {
    const read = jest.fn((err, cb) => {
      if (err === null) {
        cb(false, null); // end with no error
      } else {
        cb(err);
      }
    });

    const doneCallback = jest.fn();
    const sink = drainModule.default(null, doneCallback);

    sink(read);

    expect(doneCallback).toHaveBeenCalledTimes(1);
    expect(doneCallback).toHaveBeenCalledWith(null);

    done();
  });
});