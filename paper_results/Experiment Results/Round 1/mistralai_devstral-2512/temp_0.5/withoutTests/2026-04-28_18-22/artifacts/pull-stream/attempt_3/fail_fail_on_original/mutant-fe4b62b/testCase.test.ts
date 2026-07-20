import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink abort behavior', () => {
  it('should call abort callback with true when abort is called with function', () => {
    let callbackValue: any = null;
    const mockSource = (abort: any, cb: (err: any) => void) => {
      callbackValue = abort;
      cb(abort);
    };

    const sink = drain(null, () => {});
    sink.abort((err: any) => {
      callbackValue = err;
    }, mockSource);

    expect(callbackValue).toBe(true);
  });
});