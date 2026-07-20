import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should handle synchronous data correctly', (done) => {
    let callCount = 0;
    const source = (abort, cb) => {
      if (abort) return cb(abort);
      callCount++;
      if (callCount === 1) {
        cb(null, 'data1');
      } else if (callCount === 2) {
        cb(null, 'data2');
      } else {
        cb(true); // End the stream
      }
    };

    const op = (data) => {
      return false; // Signal to end after first data
    };

    const onDone = (err) => {
      expect(err).toBeNull();
      expect(callCount).toBe(2); // Should have read twice (initial + abort)
      done();
    };

    const sink = drain(op, onDone);
    sink(source);
  });
});