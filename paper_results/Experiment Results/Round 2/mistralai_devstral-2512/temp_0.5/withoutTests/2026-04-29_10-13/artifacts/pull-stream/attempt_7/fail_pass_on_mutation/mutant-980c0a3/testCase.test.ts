import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should properly handle stream ending with error when no done callback', () => {
    const error = new Error('test error');
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    // Create a proper pull-stream source that ends with error
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      // End stream with error immediately
      cb(error);
    };

    const sink = drain(null);
    let thrownError: any = null;

    try {
      // The sink function needs to be called with the read function
      sink(source);
    } catch (err) {
      thrownError = err;
    }

    expect(thrownError).toBe(error);
    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.objectContaining({
      message: 'no done callback supplied'
    }));

    consoleWarnSpy.mockRestore();
  });
});