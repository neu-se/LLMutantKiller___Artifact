import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should warn with specific error message when no done callback and stream ends with error', () => {
    const originalWarn = console.warn;
    const warnMock = jest.fn();
    console.warn = warnMock;

    const error = new Error('test error');
    const source = (abort: any, cb: (err?: any) => void) => {
      if (abort) {
        cb(abort);
        return;
      }
      cb(error);
    };

    const sink = drain(null, undefined);

    try {
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