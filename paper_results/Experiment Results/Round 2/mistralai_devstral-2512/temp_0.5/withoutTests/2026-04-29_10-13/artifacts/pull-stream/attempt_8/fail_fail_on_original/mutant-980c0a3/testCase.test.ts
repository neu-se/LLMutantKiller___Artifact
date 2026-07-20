import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should distinguish between true and error end values when no done callback', () => {
    const error = new Error('test error');
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    // Create a source that ends with true (normal completion)
    const sourceTrue = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      cb(true);
    };

    // Create a source that ends with error
    const sourceError = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      cb(error);
    };

    const sinkTrue = drain(null);
    const sinkError = drain(null);

    let thrownError: any = null;
    let completedNormally = false;

    try {
      sinkTrue(sourceTrue);
      completedNormally = true;
    } catch (err) {
      thrownError = err;
    }

    expect(completedNormally).toBe(true);
    expect(thrownError).toBeNull();

    thrownError = null;
    try {
      sinkError(sourceError);
    } catch (err) {
      thrownError = err;
    }

    expect(thrownError).toBe(error);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(2);
    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.objectContaining({
      message: 'no done callback supplied'
    }));

    consoleWarnSpy.mockRestore();
  });
});