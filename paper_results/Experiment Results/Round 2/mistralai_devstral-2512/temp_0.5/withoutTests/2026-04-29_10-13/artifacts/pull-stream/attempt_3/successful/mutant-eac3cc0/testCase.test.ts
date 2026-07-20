import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should call read with true when op returns false', (done) => {
    let abortValue: any = null;
    const source = (abort: any, cb: (err: any, data?: any) => void) => {
      abortValue = abort;
      cb(null, 'data');
    };

    const op = (data: any) => {
      return false;
    };

    const doneCallback = (err: any) => {
      expect(abortValue).toBe(true);
      done();
    };

    const sink = drain(op, doneCallback);
    sink(source);
  });
});