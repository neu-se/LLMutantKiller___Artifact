import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should throw error when no done callback is supplied and stream ends with error', (done) => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    let callCount = 0;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      if (callCount++ === 0) {
        cb(null, 'data');
      } else {
        cb(new Error('stream error'));
      }
    };

    const sink = drain();
    sink(source);

    setTimeout(() => {
      try {
        expect(consoleWarnSpy).toHaveBeenCalled();
        const warningMessage = consoleWarnSpy.mock.calls[0][0];
        expect(warningMessage).toBeInstanceOf(Error);
        expect(warningMessage.message).toBe('no done callback supplied');
        consoleWarnSpy.mockRestore();
        done();
      } catch (err) {
        consoleWarnSpy.mockRestore();
        done(err);
      }
    }, 10);
  });
});