import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should throw error when no done callback is provided and stream ends with error', () => {
    const error = new Error('test error');
    const source = (abort: any, cb: (err?: any) => void) => {
      if (abort) {
        cb(abort);
        return;
      }
      cb(error);
    };

    const sink = drain(null, undefined);
    expect(() => sink(source)).toThrow(error);
  });
});