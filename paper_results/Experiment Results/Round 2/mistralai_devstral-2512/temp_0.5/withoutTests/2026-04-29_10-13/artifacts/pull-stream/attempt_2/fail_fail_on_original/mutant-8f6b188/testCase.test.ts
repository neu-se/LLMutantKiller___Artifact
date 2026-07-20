import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink error handling', () => {
  it('should handle non-true end values correctly when done is missing', (done) => {
    const mockConsoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      cb(null, 'data');
      cb('error');
    };

    try {
      const sink = drain();
      sink(source);
      // In the original code, this should trigger console.warn and throw 'error'
      // In the mutated code, this won't trigger the warning/throw
      setTimeout(() => {
        expect(mockConsoleWarn).toHaveBeenCalledWith(expect.objectContaining({
          message: 'no done callback supplied'
        }));
        mockConsoleWarn.mockRestore();
        done();
      }, 10);
    } catch (e) {
      mockConsoleWarn.mockRestore();
      done.fail('Should not throw synchronously');
    }
  });
});