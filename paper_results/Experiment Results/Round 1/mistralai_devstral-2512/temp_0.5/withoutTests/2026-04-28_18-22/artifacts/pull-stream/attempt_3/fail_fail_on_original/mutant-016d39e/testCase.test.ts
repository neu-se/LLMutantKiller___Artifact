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

    try {
      source(null, (end: any, data: any) => {
        if (end) {
          sink.abort(end);
        }
      });
    } catch (e) {
      caughtError = e as Error;
    }

    expect(caughtError).toBe(testError);
  });
});