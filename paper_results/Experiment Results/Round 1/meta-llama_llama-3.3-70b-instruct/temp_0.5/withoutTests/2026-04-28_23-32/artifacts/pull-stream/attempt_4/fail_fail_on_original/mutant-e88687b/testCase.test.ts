import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should handle err correctly', () => {
    const read = jest.fn((err, cb) => {
      cb(null, null);
    });
    const done = jest.fn();
    const sink = drain(null, done);
    sink(read);
    sink.abort(() => {});
    expect(read).toHaveBeenCalledTimes(1);
    expect(read).toHaveBeenCalledWith(true, expect.any(Function));
  });
});