import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should not throw when done is provided and stream ends with error', (done) => {
    const error = new Error('test error');
    const source = (abort: any, cb: (err?: any, data?: any) => void) => {
      if (abort) return cb(abort);
      cb(error);
    };

    const sink = drain(null, (err: any) => {
      expect(err).toBe(error);
      done();
    });

    sink(source);
  });
});