import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should handle abort correctly', () => {
    let called = false;
    const read = jest.fn((err: any, cb: (end: any, data: any) => void) => {
      called = true;
      cb(null, null);
    });

    const sink = drain(read, () => {});
    sink.abort(false, () => {});
    expect(called).toBe(false);
  });
});