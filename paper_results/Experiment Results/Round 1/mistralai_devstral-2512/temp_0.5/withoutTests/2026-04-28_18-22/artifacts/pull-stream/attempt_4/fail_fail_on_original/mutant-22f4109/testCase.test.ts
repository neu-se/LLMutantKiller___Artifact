import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should initialize doneLackingErr when done is not provided', () => {
    const originalWarn = console.warn;
    const warnMock = jest.fn();
    console.warn = warnMock;

    // Create a simple source that immediately ends with an error
    const source = (abort: any, cb: (err?: any, data?: any) => void) => {
      if (abort) return cb(abort);
      cb(new Error('test error'));
    };

    // Create drain without done callback
    const sink = drain();
    // Call the sink function directly with the source
    sink(source);

    // Verify that doneLackingErr was created and used in warning
    expect(warnMock).toHaveBeenCalled();
    expect(warnMock.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(warnMock.mock.calls[0][0].message).toBe('no done callback supplied');

    console.warn = originalWarn;
  });
});