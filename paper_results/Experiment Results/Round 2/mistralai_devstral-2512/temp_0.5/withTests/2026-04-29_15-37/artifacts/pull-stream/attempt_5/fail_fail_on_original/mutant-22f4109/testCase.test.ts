const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe("drain without done callback", () => {
  it("should warn when no done callback is provided", (done) => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");
    const source = values([1, 2, 3]);
    const sink = drain();

    pull(source, sink);

    setImmediate(() => {
      expect(consoleWarnSpy).toHaveBeenCalledWith(expect.any(Error));
      expect(consoleWarnSpy.mock.calls[0][0].message).toBe('no done callback supplied');
      consoleWarnSpy.mockRestore();
      consoleErrorSpy.mockRestore();
      done();
    });
  });
});