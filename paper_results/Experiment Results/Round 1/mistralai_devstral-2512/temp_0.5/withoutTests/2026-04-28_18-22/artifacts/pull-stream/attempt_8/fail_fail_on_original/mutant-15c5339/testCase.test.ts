// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/pull-stream/attempt_1/pending_category/mutant-15c5339/testCase.test.ts
import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take mutation test', () => {
  it('should handle undefined error in terminate callback', (done) => {
    const testFn = () => true;
    const opts = { last: true };
    const takeStream = take(testFn, opts);

    const mockRead = jest.fn((end, cb) => {
      if (end) {
        // Pass undefined as error
        cb(undefined);
      } else {
        cb(null, 'data');
      }
    });

    const stream = takeStream(mockRead);

    stream(true, (result: unknown) => {
      // Original code: cb(err || true) - will pass true when err is undefined
      // Mutated code: cb(true) - will always pass true
      // This test verifies the original behavior where undefined becomes true
      expect(result).toBe(true);
      done();
    });
  });
});