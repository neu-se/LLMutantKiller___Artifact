import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should not throw an error when done callback is provided', () => {
    const read = jest.fn((err, cb) => {
      cb(null, 'data');
    });
    const done = jest.fn();
    const sink = drain(null, done);
    sink(read);
    expect(read).toHaveBeenCalledTimes(1);
    expect(read).toHaveBeenCalledWith(null, expect.any(Function));
    const readCallback = read.mock.calls[0][1];
    readCallback(null, 'data');
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(null);
    expect(console.warn).not.toHaveBeenCalled();
  });
});