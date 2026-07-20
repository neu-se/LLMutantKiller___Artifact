import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should initialize doneLackingErr when done is not provided', () => {
    const originalWarn = console.warn;
    const warnMock = jest.fn();
    console.warn = warnMock;

    const error = new Error('test error');
    const source = (abort: any, cb: (err?: any, data?: any) => void) => {
      if (abort) return cb(abort);
      // First call with data
      cb(null, 'data');
      // Second call with error
      cb(error);
    };

    const sink = drain();
    sink(source);

    // In original code: doneLackingErr is created and used in warning
    // In mutated code: doneLackingErr is not created (if (done) instead of if (!done))
    expect(warnMock).toHaveBeenCalled();
    expect(warnMock.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(warnMock.mock.calls[0][0].message).toBe('no done callback supplied');

    console.warn = originalWarn;
  });
});