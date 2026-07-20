// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/pull-stream/attempt_1/pending_category/mutant-79747e0/testCase.test.ts
import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should not call done when done is not provided and stream ends normally', (done) => {
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      cb(true); // End the stream normally
    };

    const mockDone = jest.fn();
    const sink = drain(undefined, mockDone);
    sink(source);

    setImmediate(() => {
      expect(mockDone).not.toHaveBeenCalled();
      done();
    });
  });
});