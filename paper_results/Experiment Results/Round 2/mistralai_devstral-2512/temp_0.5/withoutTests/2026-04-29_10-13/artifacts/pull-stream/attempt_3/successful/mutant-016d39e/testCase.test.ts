import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink error message', () => {
  it('should warn with descriptive message when no done callback is provided and stream ends with error', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const error = new Error('stream error');

    const source = (abort: any, cb: (err: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        cb(error);
      }
    };

    const sink = drain();
    expect(() => sink(source)).toThrow(error);

    expect(consoleWarnSpy).toHaveBeenCalled();
    const warningMessage = consoleWarnSpy.mock.calls[0][0].message;
    expect(warningMessage).toBe('no done callback supplied');

    consoleWarnSpy.mockRestore();
  });
});