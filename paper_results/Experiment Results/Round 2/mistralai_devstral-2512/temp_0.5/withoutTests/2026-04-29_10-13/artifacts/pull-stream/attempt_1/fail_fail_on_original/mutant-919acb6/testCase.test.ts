import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should handle end with false value correctly', (done) => {
    let readCount = 0;
    const source = (abort, cb) => {
      readCount++;
      if (readCount === 1) {
        cb(false, 'data');
      } else {
        cb(null, null);
      }
    };

    const sink = drain((data) => {
      return false;
    }, (end) => {
      expect(end).toBe(false);
      done();
    });

    sink(source);
  });
});