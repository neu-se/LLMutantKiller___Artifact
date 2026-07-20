import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should initialize doneLackingErr when done is not provided', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const error = new Error('stream error');

    const source = (abort: any, cb: (err?: Error | boolean) => void) => {
      if (abort) return cb(abort);
      cb(error);
    };

    const sink = drain(null, undefined);
    source(null, sink);

    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.objectContaining({
      message: 'no done callback supplied'
    }));
    consoleWarnSpy.mockRestore();
  });
});