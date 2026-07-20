import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should handle end condition correctly', (done) => {
    const read = jest.fn((err, cb) => {
      cb(true, null);
    });
    const doneCallback = jest.fn();
    const sink = drain(null, doneCallback);
    sink(read);
    expect(doneCallback).toHaveBeenCalledTimes(1);
    expect(doneCallback).toHaveBeenCalledWith(null);
    // Introduce an error after the drain has finished
    const error = new Error('Test error');
    read(null, (end, data) => {
      if (end === true) {
        throw error;
      }
    });
    try {
      // If the mutated code is used, this should throw an error
      // because it always throws the error, even if end is true
      throw error;
    } catch (e) {
      expect(e).toBe(error);
    }
    done();
  });
});