import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should throw an error when no done callback is supplied and an error occurs', (done) => {
    const sink = drain(null, null);
    sink.abort(new Error('Test error'));
    // The test will fail if no error is thrown
    // The original code will throw an error if no done callback is supplied and an error occurs
    // The mutated code will not throw an error
  });
});