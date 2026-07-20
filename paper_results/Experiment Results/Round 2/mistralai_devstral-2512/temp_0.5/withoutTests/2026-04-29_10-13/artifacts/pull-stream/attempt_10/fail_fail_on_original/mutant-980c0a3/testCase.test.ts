import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should handle true end value correctly when no done callback', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    // Create a source that ends with true (normal completion)
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      cb(true);
    };

    const sink = drain(null);
    let completedNormally = false;

    try {
      sink(source);
      completedNormally = true;
    } catch (err) {
      // Should not throw on true end value
    }

    expect(completedNormally).toBe(true);
    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.objectContaining({
      message: 'no done callback supplied'
    }));

    consoleWarnSpy.mockRestore();
  });
});