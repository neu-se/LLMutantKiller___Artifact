import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should warn when done is not provided and stream ends with error', () => {
    const originalWarn = console.warn;
    const warnMock = jest.fn();
    console.warn = warnMock;

    const error = new Error('test error');
    let readCalled = false;

    const source = (abort: any, cb: (err?: any, data?: any) => void) => {
      readCalled = true;
      if (abort) return cb(abort);
      cb(error);
    };

    const sink = drain();
    sink(source);

    expect(readCalled).toBe(true);
    expect(warnMock).toHaveBeenCalledWith(expect.objectContaining({
      message: 'no done callback supplied'
    }));

    console.warn = originalWarn;
  });
});