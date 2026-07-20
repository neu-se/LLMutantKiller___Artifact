import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink abort behavior', () => {
  it('should pass correct error value when abort is called with function', (done) => {
    const mockSource = (abort: any, cb: (err: any) => void) => {
      // This will be called with the err value from the abort function
      expect(abort).toBe(true); // Original code sets err = true
      cb(abort);
      done();
    };

    const sink = drain(null, () => {});
    // This triggers the code path where the mutation occurs
    sink.abort((err: any) => {}, mockSource);
  });
});