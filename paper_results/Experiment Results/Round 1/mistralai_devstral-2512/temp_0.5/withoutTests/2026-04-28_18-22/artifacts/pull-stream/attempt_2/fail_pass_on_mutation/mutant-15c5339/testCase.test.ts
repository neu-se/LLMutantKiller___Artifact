// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/pull-stream/attempt_1/pending_category/mutant-15c5339/testCase.test.ts
import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take mutation test', () => {
  it('should propagate error correctly in terminate callback', (done) => {
    const testFn = () => true;
    const opts = { last: true };
    const takeStream = take(testFn, opts);

    const mockRead = jest.fn((end, cb) => {
      if (end) {
        cb(new Error('terminate error'));
      } else {
        cb(null, 'data');
      }
    });

    const stream = takeStream(mockRead);

    // Trigger terminate by calling with end=true
    stream(true, (err) => {
      // Original code should pass the error through
      // Mutated code will always callback with true, ignoring the error
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe('terminate error');
      done();
    });
  });
});