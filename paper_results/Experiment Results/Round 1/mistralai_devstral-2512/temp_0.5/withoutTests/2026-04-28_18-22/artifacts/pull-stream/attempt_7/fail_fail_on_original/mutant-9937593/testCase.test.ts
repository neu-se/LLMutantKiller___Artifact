import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink error handling', () => {
  it('should properly handle error conditions when no done callback is provided', (done) => {
    const error = new Error('test error');
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const source = (abort: any, cb: (err?: any) => void) => {
      if (abort) return cb(abort);
      setImmediate(() => cb(error));
    };

    const sink = drain(null);

    sink(source);

    setImmediate(() => {
      try {
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
  });
});