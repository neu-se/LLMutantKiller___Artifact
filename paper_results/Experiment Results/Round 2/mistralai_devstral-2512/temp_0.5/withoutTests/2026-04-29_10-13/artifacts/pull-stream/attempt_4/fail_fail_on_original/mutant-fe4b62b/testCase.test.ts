// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/pull-stream/attempt_1/pending_category/mutant-fe4b62b/testCase.test.ts
import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink abort behavior', () => {
  it('should abort with true when callback is provided as first argument', (done) => {
    const source = (abort: any, cb: (err: any) => void) => {
      if (abort) {
        cb(abort);
        return;
      }
      cb(null, 'data');
    };

    const sink = drain((data: any) => false);

    const abortCallback = (err: any) => {
      expect(err).toBe(true);
      done();
    };

    // First call abort with callback as first argument
    sink.abort(abortCallback);
    // Then trigger the source
    sink(source);
  });
});