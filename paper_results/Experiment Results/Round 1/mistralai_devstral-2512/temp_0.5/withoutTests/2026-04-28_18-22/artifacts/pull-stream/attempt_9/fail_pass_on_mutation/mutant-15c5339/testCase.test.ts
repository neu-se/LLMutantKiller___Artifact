// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/pull-stream/attempt_1/pending_category/mutant-15c5339/testCase.test.ts
import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take mutation test', () => {
  it('should propagate actual error objects in terminate callback', (done) => {
    const testFn = () => true;
    const opts = { last: true };
    const takeStream = take(testFn, opts);

    const mockError = new Error('terminate error');
    const mockRead = jest.fn((end, cb) => {
      if (end) {
        cb(mockError);
      } else {
        cb(null, 'data');
      }
    });

    const stream = takeStream(mockRead);

    stream(true, (result: unknown) => {
      // Original code: cb(err || true) - passes the error object through
      // Mutated code: cb(true) - always passes true
      expect(result).toBe(mockError);
      done();
    });
  });
});