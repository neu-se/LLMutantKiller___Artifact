import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should warn when no done callback is provided and stream ends with error', () => {
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
    sink(source);

    expect(warnMock).toHaveBeenCalledWith(expect.any(Error));
    console.warn = originalWarn;
  });
});