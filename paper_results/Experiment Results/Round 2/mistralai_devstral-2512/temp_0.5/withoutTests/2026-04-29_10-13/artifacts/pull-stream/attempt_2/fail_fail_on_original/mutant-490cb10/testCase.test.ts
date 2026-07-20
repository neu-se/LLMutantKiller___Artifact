import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should warn when no done callback is supplied and stream ends with error', (done) => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const source = (abort: any, cb: (err: any, data?: any) => void) => {
      if (abort) return cb(abort);
      cb(null, 'data');
      cb(new Error('stream error'));
    };

    const sink = drain();

    sink(source);

    setImmediate(() => {
      expect(consoleWarnSpy).toHaveBeenCalled();
      const warningMessage = consoleWarnSpy.mock.calls[0][0];
      expect(warningMessage).toBeInstanceOf(Error);
      expect(warningMessage.message).toContain('no done callback supplied');
      consoleWarnSpy.mockRestore();
      done();
    });
  });
});