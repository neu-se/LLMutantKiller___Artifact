import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should throw an error when no done callback is supplied and an error occurs', () => {
    const sink = drain(null, null);
    const error = new Error('Test error');
    sink.abort(error);
    expect(sink.abort).toThrowError();
  });
});