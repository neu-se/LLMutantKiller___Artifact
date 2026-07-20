const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe('drain without done callback', () => {
  it('should warn when no done callback is provided and stream ends with error', (done) => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const error = new Error('test error');
    const source = (abort: any, cb: any) => {
      if (abort) return cb(abort);
      cb(error);
    };

    const sink = drain();

    try {
      sink(source);
      done.fail('Expected an error to be thrown');
    } catch (e) {
      expect(consoleWarnSpy).toHaveBeenCalled();
      const warningMessage = consoleWarnSpy.mock.calls[0][0];
      expect(warningMessage.message).toBe('no done callback supplied');
      expect(e).toBe(error);

      consoleWarnSpy.mockRestore();
      consoleErrorSpy.mockRestore();
      done();
    }
  });
});