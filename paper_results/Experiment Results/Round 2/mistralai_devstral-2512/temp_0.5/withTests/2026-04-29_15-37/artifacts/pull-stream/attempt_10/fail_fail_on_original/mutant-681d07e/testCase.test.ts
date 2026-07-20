// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/pull-stream/attempt_1/pending_category/mutant-681d07e/testCase.test.ts
import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull stream partial sink behavior', () => {
  it('should throw TypeError when partial sink is called twice', () => {
    // Create a function that will be treated as a partial sink
    const partialSink = function(read: any) {
      let called = false;
      return function(end: any, cb: any) {
        if (called) {
          // This should trigger the args == null check
          called = true;
          return cb(new Error('Already called'));
        }
        called = true;
        read(null, cb);
      };
    };

    // Create a simple source
    const source = function(end: any, cb: any) {
      if (end) return cb(end);
      cb(null, 1);
    };

    // Apply the partial sink
    const sink = pull(partialSink, source);

    // First call should work
    sink(null, function(end: any, data: any) {
      // Second call should trigger the error check
      expect(() => {
        sink(null, function(end: any, data: any) {});
      }).toThrow(TypeError);
    });
  });
});