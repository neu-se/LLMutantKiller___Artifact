import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should create doneLackingErr when done is not provided', () => {
    const originalWarn = console.warn;
    const warnMock = jest.fn();
    console.warn = warnMock;

    const error = new Error('test error');
    const source = (abort: any, cb: (err?: any, data?: any) => void) => {
      if (abort) return cb(abort);
      cb(error);
    };

    // Create a proper pull stream source that calls the sink correctly
    const createSource = () => {
      let called = false;
      return (abort: any, cb: (err?: any, data?: any) => void) => {
        if (called) return cb(true);
        called = true;
        if (abort) return cb(abort);
        cb(error);
      };
    };

    const sink = drain();
    const sourceStream = createSource();
    sourceStream(null, sink);

    expect(warnMock).toHaveBeenCalled();
    expect(warnMock.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(warnMock.mock.calls[0][0].message).toBe('no done callback supplied');

    console.warn = originalWarn;
  });
});