import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should warn with descriptive message when no done callback and stream errors', () => {
    const testError = new Error('stream error');
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        cb(testError);
      }
    };

    const originalWarn = console.warn;
    const mockWarn = jest.fn();
    console.warn = mockWarn;

    const sink = drain(null, undefined);

    try {
      source(null, (end: any, data: any) => {
        if (end) {
          sink.abort(end);
        }
      });
    } catch (e) {
      // Expected to throw
    }

    expect(mockWarn).toHaveBeenCalled();
    expect(mockWarn.mock.calls[0][0].message).toBe('no done callback supplied');

    console.warn = originalWarn;
  });
});