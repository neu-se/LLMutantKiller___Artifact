const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe("drain without done callback", () => {
  it("should warn when no done callback is provided", (done) => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const source = (abort: any, cb: any) => {
      if (abort) return cb(abort);
      cb(null, 1);
      cb(true);
    };

    const sink = drain();

    pull(source, sink);

    setTimeout(() => {
      try {
        expect(consoleWarnSpy).toHaveBeenCalledWith(expect.any(Error));
        const error = consoleWarnSpy.mock.calls[0][0];
        expect(error.message).toBe('no done callback supplied');
        done();
      } catch (e) {
        done(e);
      } finally {
        consoleWarnSpy.mockRestore();
        consoleErrorSpy.mockRestore();
      }
    }, 100);
  }, 1000);
});