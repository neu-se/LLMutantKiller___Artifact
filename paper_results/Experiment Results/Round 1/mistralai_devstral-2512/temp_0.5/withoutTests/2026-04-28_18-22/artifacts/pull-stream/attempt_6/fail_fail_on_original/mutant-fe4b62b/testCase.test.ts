import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink abort behavior', () => {
  it('should handle abort with function parameter correctly', () => {
    let abortValue: any = null;
    const mockSource = (abort: any, cb: (err: any) => void) => {
      abortValue = abort;
      cb(abort);
    };

    const sink = drain(null, () => {});
    sink.abort((err: any) => {}, mockSource);

    // The mutation changes err from true to false in the abort function
    // This test verifies the original behavior where err should be true
    expect(abortValue).toBe(true);
  });
});