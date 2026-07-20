import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should throw an error when no done callback is supplied and an error occurs', () => {
    const drain = drainModule.default;
    const sink = drain(null, null);
    const error = new Error('Test error');
    expect(() => {
      sink.abort(error);
    }).toThrowError('no done callback supplied');
  });
});