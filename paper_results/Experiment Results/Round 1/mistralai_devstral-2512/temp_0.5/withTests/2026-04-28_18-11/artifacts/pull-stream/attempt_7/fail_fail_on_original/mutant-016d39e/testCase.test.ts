const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");
const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe('drain error message', () => {
  it('should produce descriptive error when no done callback is provided', (done) => {
    const originalWarn = console.warn;
    const mockWarn = jest.fn();
    console.warn = mockWarn;

    try {
      pull(
        values([1, 2, 3]),
        drain()
      );

      setImmediate(() => {
        expect(mockWarn).toHaveBeenCalled();
        const error = mockWarn.mock.calls[0][0];
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('no done callback supplied');
        console.warn = originalWarn;
        done();
      });
    } catch (err) {
      console.warn = originalWarn;
      done(err);
    }
  });
});