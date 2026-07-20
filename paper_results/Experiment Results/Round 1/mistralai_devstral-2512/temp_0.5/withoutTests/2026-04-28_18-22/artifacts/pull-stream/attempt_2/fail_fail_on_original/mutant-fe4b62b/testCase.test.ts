import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink abort behavior', () => {
  it('should handle abort with function parameter correctly', (done) => {
    const mockSource = (abort: any, cb: (err: any) => void) => {
      if (abort) {
        cb(abort);
      }
    };

    const mockDone = (err: any) => {
      expect(err).toBe(true);
      done();
    };

    const sink = drain(null, mockDone);
    sink.abort(mockDone, mockSource);
  });
});