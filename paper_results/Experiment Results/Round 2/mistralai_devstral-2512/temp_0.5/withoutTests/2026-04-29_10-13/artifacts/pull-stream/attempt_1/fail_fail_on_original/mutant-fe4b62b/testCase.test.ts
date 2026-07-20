// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/pull-stream/attempt_1/pending_category/mutant-fe4b62b/testCase.test.ts
import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink abort behavior', () => {
  it('should abort with true when callback is provided as first argument', (done) => {
    const source = (abort, cb) => {
      if (abort) {
        cb(abort);
        return;
      }
      cb(null, 'data');
    };

    const sink = drain((data) => {
      // Should not be called after abort
      throw new Error('Should not process data after abort');
    });

    const abortCallback = (err) => {
      expect(err).toBe(true);
      done();
    };

    sink.abort(abortCallback);
    sink(source);
  });
});