import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink error handling', () => {
  it('should handle error when stream ends with error and no done callback', (done) => {
    const error = new Error('test error');
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const source = (abort: any, cb: (err?: any) => void) => {
      if (abort) return cb(abort);
      // Use setImmediate to ensure async behavior
      setImmediate(() => cb(error));
    };

    const sink = drain(null);

    // Wrap in try-catch to handle the thrown error
    try {
      sink(source);
      setImmediate(() => {
        try {
          // The original code should warn about missing done callback
          expect(consoleWarnSpy).toHaveBeenCalledWith(expect.objectContaining({
            message: 'no done callback supplied'
          }));
          consoleWarnSpy.mockRestore();
          consoleErrorSpy.mockRestore();
          done();
        } catch (e) {
          consoleWarnSpy.mockRestore();
          consoleErrorSpy.mockRestore();
          done(e);
        }
      });
    } catch (e) {
      consoleWarnSpy.mockRestore();
      consoleErrorSpy.mockRestore();
      done(e);
    }
  });
});