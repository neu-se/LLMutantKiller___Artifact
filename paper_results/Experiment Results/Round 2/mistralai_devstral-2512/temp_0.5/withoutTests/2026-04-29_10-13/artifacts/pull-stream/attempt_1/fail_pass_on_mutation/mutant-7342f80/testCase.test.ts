import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should throw an error when done callback is not provided and stream ends with an error', () => {
    const error = new Error('stream error');
    const source = (abort, cb) => {
      if (abort) return cb(abort);
      cb(error);
    };

    expect(() => {
      const sink = drain();
      sink(source);
    }).toThrow(error);
  });
});