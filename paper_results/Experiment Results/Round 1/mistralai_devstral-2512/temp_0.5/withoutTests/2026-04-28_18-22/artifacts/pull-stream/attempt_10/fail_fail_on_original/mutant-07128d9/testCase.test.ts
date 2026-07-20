import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain mutation test', () => {
  it('should handle error end condition without done callback', () => {
    const error = new Error('test error');
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort, null);
        return;
      }
      cb(error, 'data');
    };

    const sink = drain(null);
    sink(source);

    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.objectContaining({
      message: 'no done callback supplied'
    }));
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    consoleWarnSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });
});