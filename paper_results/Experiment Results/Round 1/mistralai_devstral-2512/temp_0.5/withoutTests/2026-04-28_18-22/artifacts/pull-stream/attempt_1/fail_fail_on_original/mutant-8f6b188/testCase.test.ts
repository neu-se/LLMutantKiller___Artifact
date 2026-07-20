import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should call done with non-true end value when stream ends with error', (done) => {
    const error = new Error('test error');
    const source = (abort, cb) => {
      if (abort) {
        cb(abort);
      } else {
        cb(error);
      }
    };

    drain(null, (end) => {
      expect(end).toBe(error);
      done();
    });

    source(null, (end, data) => {
      if (end) {
        // Stream ended with error
      } else {
        // Process data
      }
    });
  });
});