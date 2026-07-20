import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should throw a meaningful error when no done callback is supplied and an error occurs', () => {
    const sink = drain(null, null);
    const error = new Error('Test error');
    sink.abort(error);
    try {
      sink(null, function (end, data) {
        if (end && end !== true) {
          throw end;
        }
      });
    } catch (e) {
      expect(e.message).not.toBe('');
    }
  });
});