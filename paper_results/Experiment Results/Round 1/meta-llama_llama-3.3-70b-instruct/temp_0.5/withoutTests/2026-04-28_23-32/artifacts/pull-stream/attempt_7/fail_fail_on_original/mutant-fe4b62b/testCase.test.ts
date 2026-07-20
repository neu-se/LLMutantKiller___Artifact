import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should handle abort correctly', () => {
    let called = false;
    const read = (err: any, cb: (end: any, data: any) => void) => {
      if (err) {
        called = true;
      }
      cb(null, null);
    };

    const sink = drain(null, () => {});
    sink.abort(true, () => {});
    expect(called).toBe(true);
  });
});