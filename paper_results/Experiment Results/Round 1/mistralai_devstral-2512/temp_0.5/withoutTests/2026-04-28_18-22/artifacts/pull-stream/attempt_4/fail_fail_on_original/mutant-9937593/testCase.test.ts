import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink error handling', () => {
  it('should handle error when stream ends with error and no done callback', (done) => {
    const error = new Error('test error');
    let callbackInvoked = false;

    const source = (abort: any, cb: (err?: any) => void) => {
      if (abort) return cb(abort);
      if (!callbackInvoked) {
        callbackInvoked = true;
        cb(error);
      }
    };

    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const sink = drain(null);

    try {
      sink(source);
      setImmediate(() => {
        expect(consoleWarnSpy).toHaveBeenCalled();
        consoleWarnSpy.mockRestore();
        done();
      });
    } catch (e) {
      consoleWarnSpy.mockRestore();
      done(e);
    }
  });
});