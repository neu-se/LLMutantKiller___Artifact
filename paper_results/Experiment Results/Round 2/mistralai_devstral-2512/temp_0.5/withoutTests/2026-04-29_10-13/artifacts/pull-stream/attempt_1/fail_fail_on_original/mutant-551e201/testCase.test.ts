import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink with error handling', () => {
  it('should throw error when done callback is not provided and stream ends with error', () => {
    const error = new Error('stream error');
    const source = (abort, cb) => {
      if (abort) return cb(abort);
      cb(error);
    };

    const sink = drain(null, undefined);
    expect(() => {
      source(null, sink);
    }).toThrow(error);
  });
});