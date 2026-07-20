import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should handle stream ending without done callback', (done) => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const error = new Error('stream error');
    let readCalled = false;

    const source = (abort: any, cb: (err?: Error | boolean) => void) => {
      readCalled = true;
      if (abort) return cb(abort);
      cb(error);
    };

    const sink = drain(null, undefined);
    sink(source);

    setImmediate(() => {
      expect(readCalled).toBe(true);
      expect(consoleWarnSpy).toHaveBeenCalledWith(expect.any(Error));
      consoleWarnSpy.mockRestore();
      done();
    });
  });
});