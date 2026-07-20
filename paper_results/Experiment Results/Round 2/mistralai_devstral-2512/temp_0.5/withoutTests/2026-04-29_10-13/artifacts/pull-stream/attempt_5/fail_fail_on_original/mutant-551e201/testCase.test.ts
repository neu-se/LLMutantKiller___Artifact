import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink error handling', () => {
  it('should warn and throw when done is missing and stream ends with error', () => {
    const error = new Error('test error');
    const mockWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const mockError = jest.spyOn(console, 'error').mockImplementation(() => {});

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      // Simulate stream ending with error
      cb(error);
    };

    const sink = drain(null, undefined);
    let testError: Error | null = null;

    try {
      source(null, sink);
    } catch (e) {
      testError = e as Error;
    }

    expect(mockWarn).toHaveBeenCalledWith(expect.objectContaining({
      message: 'no done callback supplied'
    }));
    expect(testError).toBe(error);
    mockWarn.mockRestore();
    mockError.mockRestore();
  });
});