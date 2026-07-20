// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/pull-stream/attempt_1/pending_category/mutant-15c5339/testCase.test.ts
import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take mutation test', () => {
  it('should handle error in terminate callback correctly', (done) => {
    const testFn = () => true;
    const opts = { last: true };
    const takeStream = take(testFn, opts);

    const mockRead = jest.fn((end, cb) => {
      if (end) {
        cb(new Error('test error'));
      } else {
        cb(null, 'data');
      }
    });

    const stream = takeStream(mockRead);

    // First call to trigger the terminate path
    stream(true, (err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe('test error');
      done();
    });
  });
});