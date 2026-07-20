import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink error handling', () => {
  it('should warn when done is missing and stream ends with non-true error', () => {
    const error = new Error('test error');
    const mockWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    // Create a pull stream source that ends with an error
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      // Simulate stream ending with error
      cb(error);
    };

    const sink = drain(null, undefined);

    // The sink needs to be called with the source's read function
    source(null, sink);

    // The original code should warn about missing done callback
    expect(mockWarn).toHaveBeenCalledWith(expect.any(Error));
    mockWarn.mockRestore();
  });
});