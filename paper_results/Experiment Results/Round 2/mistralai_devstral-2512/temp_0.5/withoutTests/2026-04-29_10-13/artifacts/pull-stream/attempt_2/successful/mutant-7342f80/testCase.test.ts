import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should warn when done callback is not provided and stream ends with error', () => {
    const originalWarn = console.warn;
    const warnMock = jest.fn();
    console.warn = warnMock;

    const error = new Error('stream error');
    const source = (abort, cb) => {
      if (abort) return cb(abort);
      cb(error);
    };

    try {
      const sink = drain();
      sink(source);
    } catch (e) {
      // Expected to throw
    }

    expect(warnMock).toHaveBeenCalledWith(expect.objectContaining({
      message: 'no done callback supplied'
    }));

    console.warn = originalWarn;
  });
});