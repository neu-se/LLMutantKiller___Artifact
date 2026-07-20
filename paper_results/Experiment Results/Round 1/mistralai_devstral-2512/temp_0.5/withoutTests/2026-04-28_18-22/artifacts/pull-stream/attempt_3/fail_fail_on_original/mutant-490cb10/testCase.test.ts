import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should throw error when no done callback is supplied and stream ends with error', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const source = (abort: any, cb: (err: any, data?: any) => void) => {
      if (abort) return cb(abort);
      cb(null, 'data');
      setTimeout(() => cb(new Error('stream error')), 10);
    };

    const sink = drain();
    expect(() => {
      source(null, sink);
    }).toThrow();

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(consoleWarnSpy).toHaveBeenCalled();
        const warningMessage = consoleWarnSpy.mock.calls[0][0];
        expect(warningMessage).toBeInstanceOf(Error);
        expect(warningMessage.message).toBe('no done callback supplied');
        consoleWarnSpy.mockRestore();
        resolve();
      }, 20);
    });
  });
});