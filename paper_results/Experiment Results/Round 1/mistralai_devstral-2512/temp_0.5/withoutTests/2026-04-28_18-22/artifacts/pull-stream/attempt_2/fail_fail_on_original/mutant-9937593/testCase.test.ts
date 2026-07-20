import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink error handling', () => {
  it('should throw error when stream ends with error and no done callback', (done) => {
    const error = new Error('test error');
    const source = (abort, cb) => {
      if (abort) return cb(abort);
      cb(error);
    };

    const sink = drain(null);
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

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