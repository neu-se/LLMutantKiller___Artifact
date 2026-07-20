import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should handle abort correctly', () => {
    const read = (err: any, cb: (end: any, data: any) => void) => {
      cb(null, null);
    };

    const sink = drain(null, () => {});
    const cb = jest.fn();
    const err = jest.fn();
    sink.abort(err, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(err).not.toHaveBeenCalled();
  });
});