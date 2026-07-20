const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe('drain without done callback', () => {
  it('should warn when no done callback is provided', (done) => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const source = (abort: any, cb: any) => {
      if (abort) return cb(abort);
      cb(null, 1);
      cb(true);
    };

    const sink = drain();

    sink(source);

    expect(consoleWarnSpy).toHaveBeenCalled();
    const warningMessage = consoleWarnSpy.mock.calls[0][0];
    expect(warningMessage.message).toBe('no done callback supplied');

    consoleWarnSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    done();
  });
});