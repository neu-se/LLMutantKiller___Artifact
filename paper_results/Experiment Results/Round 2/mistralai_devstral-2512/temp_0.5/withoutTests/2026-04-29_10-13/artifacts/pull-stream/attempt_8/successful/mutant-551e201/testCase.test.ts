import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink error handling', () => {
  it('should warn and throw when done is missing and stream ends with error', () => {
    const error = new Error('test error');
    const mockWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    // Create a proper pull stream source
    const source = () => {
      let called = false;
      return (abort: any, cb: (end: any, data?: any) => void) => {
        if (called) return cb(true);
        called = true;
        if (abort) return cb(abort);
        // Simulate stream ending with error
        cb(error);
      };
    };

    const sink = drain(null, undefined);
    let testError: Error | null = null;

    try {
      const read = source();
      sink(read);
    } catch (e) {
      testError = e as Error;
    }

    expect(mockWarn).toHaveBeenCalledWith(expect.any(Error));
    expect(testError).toBe(error);
    mockWarn.mockRestore();
  });
});