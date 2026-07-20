import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should handle end condition correctly', (done) => {
    const read = jest.fn((err, cb) => {
      if (err === null) {
        cb(new Error('test error'), null); // end with error
      } else {
        cb(err);
      }
    });

    const doneCallback = jest.fn();
    const sink = drain(null, doneCallback);

    sink(read);

    expect(doneCallback).toHaveBeenCalledTimes(1);
    expect(doneCallback).toHaveBeenCalledWith(new Error('test error'));

    done();
  });
});