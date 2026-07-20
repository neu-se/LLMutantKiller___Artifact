import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should warn when no done callback is provided and stream ends with error', () => {
    const originalWarn = console.warn;
    const warnMock = jest.fn();
    console.warn = warnMock;

    const error = new Error('test error');
    const source = (abort: any, cb: (err?: any, data?: any) => void) => {
      if (abort) return cb(abort);
      cb(error);
    };

    const sink = drain();
    source(null, sink);

    expect(warnMock).toHaveBeenCalledWith(expect.any(Error));
    expect(warnMock.mock.calls[0][0].message).toBe('no done callback supplied');

    console.warn = originalWarn;
  });
});