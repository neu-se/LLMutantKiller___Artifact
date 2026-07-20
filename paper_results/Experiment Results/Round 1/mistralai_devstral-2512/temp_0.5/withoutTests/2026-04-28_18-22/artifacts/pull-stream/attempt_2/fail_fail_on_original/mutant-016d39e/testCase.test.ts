import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should show descriptive error message when no done callback is provided and stream errors', () => {
    const error = new Error('stream error');
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        cb(error);
      }
    };

    const sink = drain(null, undefined);
    const mockConsoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    try {
      source(null, (end: any, data: any) => {
        if (end) {
          sink.abort(end);
        }
      });
    } catch (e) {
      // Error should be thrown
    }

    expect(mockConsoleWarn).toHaveBeenCalled();
    const warningMessage = mockConsoleWarn.mock.calls[0][0].message;
    expect(warningMessage).toBe('no done callback supplied');

    mockConsoleWarn.mockRestore();
  });
});