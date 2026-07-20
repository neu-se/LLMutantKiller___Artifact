// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/pull-stream/attempt_1/pending_category/mutant-15c5339/testCase.test.ts
import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take mutation test', () => {
  it('should handle error propagation in terminate callback', (done) => {
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

    stream(true, (err: unknown) => {
      // Original code: cb(err || true) - passes the error through
      // Mutated code: cb(true) - always passes true
      if (err instanceof Error) {
        expect(err.message).toBe('test error');
        done();
      } else {
        fail('Expected error but got: ' + err);
      }
    });
  });
});