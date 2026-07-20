import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink abort behavior', () => {
  it('should pass true to source when abort is called with function parameter', () => {
    let receivedAbortValue: any = null;
    const mockSource = (abort: any, cb: (err: any) => void) => {
      receivedAbortValue = abort;
      cb(abort);
    };

    const sink = drain(null, () => {});
    // Call abort with a function as first parameter
    sink.abort((err: any) => {}, mockSource);

    // In original code, err should be set to true
    // In mutated code, err would be set to false
    expect(receivedAbortValue).toBe(true);
  });
});