import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink abort behavior', () => {
  it('should handle function parameter in abort correctly', () => {
    let abortWasCalled = false;
    let abortValue: any = null;

    const mockSource = (abort: any, cb: (err: any) => void) => {
      abortWasCalled = true;
      abortValue = abort;
      cb(abort);
    };

    const sink = drain(null, () => {});
    // This triggers the code path where the mutation occurs
    sink.abort((err: any) => {}, mockSource);

    // Verify the source was called
    expect(abortWasCalled).toBe(true);
    // In original code, err should be true
    // In mutated code, err would be false
    expect(abortValue).toBe(true);
  });
});