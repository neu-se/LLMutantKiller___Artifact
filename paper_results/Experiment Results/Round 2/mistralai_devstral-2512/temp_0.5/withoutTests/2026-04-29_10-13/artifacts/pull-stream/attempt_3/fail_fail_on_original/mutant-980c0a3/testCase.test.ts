import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should call done with error when stream ends with error and no done callback', () => {
    const error = new Error('test error');
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      cb(error);
    };

    const sink = drain(null);
    expect(() => source(null, sink)).toThrow(error);

    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.any(Error));
    expect(consoleErrorSpy).not.toHaveBeenCalled();

    consoleWarnSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });
});