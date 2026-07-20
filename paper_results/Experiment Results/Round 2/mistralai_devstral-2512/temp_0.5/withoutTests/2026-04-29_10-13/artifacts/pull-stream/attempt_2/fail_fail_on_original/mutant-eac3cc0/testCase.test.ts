import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should abort with true when op returns false', (done) => {
    let callCount = 0;
    const source = (abort: any, cb: (err: any, data?: any) => void) => {
      callCount++;
      if (callCount === 1) {
        cb(null, 'data');
      } else if (callCount === 2) {
        cb(abort);
      }
    };

    const op = (data: any) => {
      return false;
    };

    const doneCallback = (err: any) => {
      expect(err).toBeNull();
      done();
    };

    const sink = drain(op, doneCallback);
    sink(source);
  });
});