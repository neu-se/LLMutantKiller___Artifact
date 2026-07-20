import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink error handling', () => {
  it('should warn and throw when done is missing and stream ends with error', () => {
    const error = new Error('test error');
    const mockWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      // Simulate stream ending with error
      cb(error);
    };

    const sink = drain(null, undefined);
    let testError: Error | null = null;

    // Need to call the sink function first to set up the read function
    const read = sink;
    source(null, read);

    try {
      // The error should be thrown during the read callback
      // We need to trigger the read callback manually
      read(null, (end: any) => {
        if (end && end !== true) {
          throw end;
        }
      });
    } catch (e) {
      testError = e as Error;
    }

    expect(testError).toBe(error);
    expect(mockWarn).toHaveBeenCalledWith(expect.any(Error));
    mockWarn.mockRestore();
  });
});