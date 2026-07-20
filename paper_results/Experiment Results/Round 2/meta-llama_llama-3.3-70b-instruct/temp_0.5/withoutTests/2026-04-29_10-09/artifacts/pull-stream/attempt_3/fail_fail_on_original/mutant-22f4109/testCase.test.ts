import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should not throw an error when done callback is not provided in the original code but should throw an error in the mutated code', () => {
    const read = jest.fn((err, cb) => {
      cb(null, 'data');
    });
    const sink = drain(null, null);
    sink(read);
    expect(read).toHaveBeenCalledTimes(1);
    expect(read).toHaveBeenCalledWith(null, expect.any(Function));
    const readCallback = read.mock.calls[0][1];
    readCallback(null, 'data');
    expect(console.warn).toHaveBeenCalledTimes(1);
  });
});