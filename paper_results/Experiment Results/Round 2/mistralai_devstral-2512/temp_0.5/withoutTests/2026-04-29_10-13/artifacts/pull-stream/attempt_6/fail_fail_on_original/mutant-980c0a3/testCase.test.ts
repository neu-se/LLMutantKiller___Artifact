import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should handle error when stream ends with error and no done callback', () => {
    const error = new Error('test error');
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Create a proper pull-stream source
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      // First call with data
      cb(null, 'data');
      // Second call with error to end stream
      cb(error);
    };

    const sink = drain(null);
    let thrownError: any = null;

    try {
      source(null, sink);
    } catch (err) {
      thrownError = err;
    }

    expect(thrownError).toBe(error);
    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.objectContaining({
      message: 'no done callback supplied'
    }));
    expect(consoleErrorSpy).not.toHaveBeenCalled();

    consoleWarnSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });
});