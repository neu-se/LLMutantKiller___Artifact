import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should create doneLackingErr error object when done is not provided', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const error = new Error('stream error');

    const source = (abort: any, cb: (end: Error | boolean | null, data?: any) => void) => {
      if (abort) return cb(abort);
      cb(error);
    };

    const sink = drain(null, undefined);
    expect(() => {
      source(null, sink);
    }).toThrow(error);

    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.objectContaining({
      message: 'no done callback supplied'
    }));
    consoleWarnSpy.mockRestore();
  });
});