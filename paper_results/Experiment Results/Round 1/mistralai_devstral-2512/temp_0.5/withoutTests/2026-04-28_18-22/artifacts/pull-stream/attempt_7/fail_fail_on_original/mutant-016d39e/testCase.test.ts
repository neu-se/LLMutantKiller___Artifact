import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should throw error with descriptive message when no done callback and stream errors', () => {
    const testError = new Error('stream error');
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        cb(testError);
      }
    };

    const sink = drain(null, undefined);
    let caughtError: Error | null = null;
    let warningMessage: string | null = null;

    const originalWarn = console.warn;
    console.warn = (msg: any) => {
      warningMessage = msg.message;
    };

    try {
      source(null, (end: any, data: any) => {
        if (end) {
          sink.abort(end);
        }
      });
    } catch (e) {
      caughtError = e as Error;
    } finally {
      console.warn = originalWarn;
    }

    expect(warningMessage).toBe('no done callback supplied');
  });
});