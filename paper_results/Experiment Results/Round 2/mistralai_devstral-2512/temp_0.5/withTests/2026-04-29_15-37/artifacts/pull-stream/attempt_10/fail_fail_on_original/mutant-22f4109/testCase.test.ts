const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe("drain without done callback", () => {
  it("should handle stream end without done callback", (done) => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    let callCount = 0;
    const source = (abort: any, cb: any) => {
      if (abort) return cb(abort);
      if (callCount === 0) {
        callCount++;
        cb(null, 1);
      } else {
        cb(true); // End stream
      }
    };

    const sink = drain();

    pull(source, sink);

    setTimeout(() => {
      // In original code, this should warn about missing done callback
      // In mutated code, it won't warn
      expect(consoleWarnSpy).toHaveBeenCalled();
      expect(consoleWarnSpy.mock.calls[0][0].message).toBe('no done callback supplied');
      consoleWarnSpy.mockRestore();
      consoleErrorSpy.mockRestore();
      done();
    }, 50);
  });
});