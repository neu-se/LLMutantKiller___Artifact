import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should call done with true when op returns false', (done) => {
    let callCount = 0;
    const source = (abort, cb) => {
      callCount++;
      if (callCount === 1) {
        cb(null, 'data');
      } else if (callCount === 2) {
        cb(true);
      }
    };

    const op = (data) => {
      return false;
    };

    const doneCallback = (err) => {
      expect(err).toBeNull();
      done();
    };

    const sink = drain(op, doneCallback);
    sink(source);
  });
});