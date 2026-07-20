import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink error handling', () => {
  it('should handle error when stream ends with error and no done callback', (done) => {
    const error = new Error('test error');
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const source = (abort: any, cb: (err?: any) => void) => {
      if (abort) return cb(abort);
      // Use process.nextTick to ensure the error is handled asynchronously
      process.nextTick(() => cb(error));
    };

    const sink = drain(null);

    // The original code should warn about missing done callback
    // The mutated code (with else if(false)) should not warn
    sink(source);

    setImmediate(() => {
      expect(consoleWarnSpy).toHaveBeenCalledWith(expect.objectContaining({
        message: 'no done callback supplied'
      }));
      consoleWarnSpy.mockRestore();
      done();
    });
  });
});