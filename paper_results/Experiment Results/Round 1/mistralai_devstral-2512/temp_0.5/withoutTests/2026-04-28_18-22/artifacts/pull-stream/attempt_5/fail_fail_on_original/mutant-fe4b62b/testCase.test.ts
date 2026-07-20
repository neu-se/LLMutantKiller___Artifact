import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink abort behavior', () => {
  it('should call source with true when abort is called with function', () => {
    let sourceCalledWith: any = null;
    const mockSource = (abort: any, cb: (err: any) => void) => {
      sourceCalledWith = abort;
      cb(abort);
    };

    const sink = drain(null, () => {});
    sink.abort((err: any) => {}, mockSource);

    expect(sourceCalledWith).toBe(true);
  });
});