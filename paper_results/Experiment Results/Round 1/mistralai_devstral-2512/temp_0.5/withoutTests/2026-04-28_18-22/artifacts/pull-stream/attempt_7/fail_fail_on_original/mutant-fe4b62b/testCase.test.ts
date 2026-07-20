import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink abort behavior', () => {
  it('should call source with true when abort is called with function', () => {
    let sourceAbortValue: any = null;
    const mockSource = (abort: any, cb: (err: any) => void) => {
      sourceAbortValue = abort;
      cb(abort);
    };

    const sink = drain(null, () => {});
    sink.abort((err: any) => {}, mockSource);

    // The mutation changes the err value from true to false in the abort function
    // This test verifies the original behavior where the source should receive true
    expect(sourceAbortValue).toBe(true);
  });
});