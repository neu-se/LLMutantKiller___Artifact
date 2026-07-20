import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should handle end with error correctly', (done) => {
    const error = new Error('test error');
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      cb(error);
    };

    const sink = drain(null, (end: any) => {
      expect(end).toBe(error);
      done();
    });

    source(null, sink);
  });
});