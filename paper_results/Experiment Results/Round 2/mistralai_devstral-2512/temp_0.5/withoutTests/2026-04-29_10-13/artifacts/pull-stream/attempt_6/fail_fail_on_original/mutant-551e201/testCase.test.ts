import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink error handling', () => {
  it('should throw error when done is missing and stream ends with non-true error', () => {
    const error = new Error('test error');
    const mockWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const mockError = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Create a pull stream source that ends with an error
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      // Simulate stream ending with error
      cb(error);
    };

    const sink = drain(null, undefined);
    let testError: Error | null = null;

    try {
      // The sink needs to be called with the source's read function
      source(null, sink);
    } catch (e) {
      testError = e as Error;
    }

    // The original code should throw the error and warn
    expect(testError).toBe(error);
    expect(mockWarn).toHaveBeenCalled();
    mockWarn.mockRestore();
    mockError.mockRestore();
  });
});