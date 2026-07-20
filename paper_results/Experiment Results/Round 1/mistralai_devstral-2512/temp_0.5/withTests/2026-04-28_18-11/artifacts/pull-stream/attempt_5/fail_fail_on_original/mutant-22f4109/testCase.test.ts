const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe('drain without done callback', () => {
  it('should warn when stream ends without done callback', (done) => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

    pull(
      pull.values([1, 2, 3]),
      drain(null) // Passing null as done callback
    );

    setImmediate(() => {
      expect(consoleWarnSpy).toHaveBeenCalled();
      const warning = consoleWarnSpy.mock.calls[0][0];
      expect(warning).toBeInstanceOf(Error);
      expect(warning.message).toBe('no done callback supplied');
      consoleWarnSpy.mockRestore();
      done();
    });
  });
});