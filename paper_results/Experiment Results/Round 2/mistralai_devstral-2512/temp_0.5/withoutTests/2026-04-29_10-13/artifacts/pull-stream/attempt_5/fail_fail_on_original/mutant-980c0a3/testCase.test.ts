import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should throw error when stream ends with error and no done callback', () => {
    const error = new Error('test error');
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      cb(error);
    };

    const sink = drain(null);
    let thrownError: any = null;

    try {
      source(null, sink);
    } catch (err) {
      thrownError = err;
    }

    expect(thrownError).toBe(error);
    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.objectContaining({
      message: 'no done callback supplied'
    }));

    consoleWarnSpy.mockRestore();
  });
});