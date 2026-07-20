// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/pull-stream/attempt_1/pending_category/mutant-681d07e/testCase.test.ts
import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull stream partial sink behavior', () => {
  it('should throw TypeError when partial sink is called twice', () => {
    // Create a partial sink by passing a function with length 1
    const partialSink = pull(function(read: any) {
      return function(end: any, cb: any) {
        if (end) return cb(end);
        read(null, function(end: any, data: any) {
          if (end) return cb(end);
          cb(null, data);
        });
      };
    });

    // Create a simple source
    const source = function(end: any, cb: any) {
      if (end) return cb(end);
      cb(null, 1);
    };

    // Apply the partial sink to the source
    const sink = partialSink(source);

    // First call should work
    let firstResult: any;
    sink(null, function(end: any, data: any) {
      firstResult = { end, data };
    });

    // Second call should throw TypeError in original code
    expect(() => {
      sink(null, function(end: any, data: any) {});
    }).toThrow(TypeError);
  });
});