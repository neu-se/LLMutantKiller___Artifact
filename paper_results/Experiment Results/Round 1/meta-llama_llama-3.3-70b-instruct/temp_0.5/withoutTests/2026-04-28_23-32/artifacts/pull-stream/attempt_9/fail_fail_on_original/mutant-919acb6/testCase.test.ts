import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should handle end condition correctly', (done) => {
    const read = jest.fn((err, cb) => {
      cb(0, null); // end with a number
    });

    const doneCallback = jest.fn();
    const sink = drain(null, doneCallback);

    sink(read);

    expect(doneCallback).toHaveBeenCalledTimes(1);
    expect(doneCallback).toHaveBeenCalledWith(0);

    done();
  });
});