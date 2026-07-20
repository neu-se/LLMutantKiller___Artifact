import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should warn when no done callback is provided and stream ends with error', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const error = new Error('stream error');
    const source = (abort: any, cb: (err?: Error | boolean) => void) => {
      if (abort) return cb(abort);
      cb(error);
    };

    const sink = drain(null, undefined);
    source(null, sink);

    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.any(Error));
    consoleWarnSpy.mockRestore();
  });
});