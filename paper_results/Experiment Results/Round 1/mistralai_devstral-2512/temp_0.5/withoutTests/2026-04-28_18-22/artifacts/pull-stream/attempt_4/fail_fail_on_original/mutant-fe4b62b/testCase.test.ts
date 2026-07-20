import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink abort behavior', () => {
  it('should handle abort with function parameter correctly', () => {
    let abortCalledWith: any = null;
    const mockSource = (abort: any, cb: (err: any) => void) => {
      abortCalledWith = abort;
      cb(abort);
    };

    const sink = drain(null, () => {});
    sink.abort((err: any) => {}, mockSource);

    expect(abortCalledWith).toBe(true);
  });
});