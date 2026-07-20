import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink error handling', () => {
  it('should warn and throw when stream ends with error and no done callback', (done) => {
    const error = new Error('test error');
    const source = (abort: any, cb: (err?: any) => void) => {
      if (abort) return cb(abort);
      cb(error);
    };

    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const sink = drain(null);

    sink(source);

    setImmediate(() => {
      expect(consoleWarnSpy).toHaveBeenCalledWith(expect.objectContaining({
        message: 'no done callback supplied'
      }));
      consoleWarnSpy.mockRestore();
      done();
    });
  });
});