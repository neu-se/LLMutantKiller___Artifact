// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/pull-stream/attempt_1/pending_category/mutant-79747e0/testCase.test.ts
import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should call done with error when done is provided and stream ends with error', (done) => {
    const error = new Error('test error');
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      cb(error); // End the stream with error
    };

    const mockDone = jest.fn();
    const sink = drain(null, mockDone);
    sink(source);

    setImmediate(() => {
      expect(mockDone).toHaveBeenCalledWith(error);
      done();
    });
  });
});