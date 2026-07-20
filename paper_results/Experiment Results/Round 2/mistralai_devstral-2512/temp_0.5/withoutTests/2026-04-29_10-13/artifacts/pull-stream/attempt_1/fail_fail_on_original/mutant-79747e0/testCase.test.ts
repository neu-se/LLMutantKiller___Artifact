// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/pull-stream/attempt_1/pending_category/mutant-79747e0/testCase.test.ts
import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should not call done when done is not provided', (done) => {
    const source = (abort, cb) => {
      if (abort) return cb(abort);
      cb(null, 'data');
      cb(true); // End the stream
    };

    const mockDone = jest.fn();
    const sink = drain(null, mockDone);
    sink(source);

    setImmediate(() => {
      expect(mockDone).not.toHaveBeenCalled();
      done();
    });
  });
});