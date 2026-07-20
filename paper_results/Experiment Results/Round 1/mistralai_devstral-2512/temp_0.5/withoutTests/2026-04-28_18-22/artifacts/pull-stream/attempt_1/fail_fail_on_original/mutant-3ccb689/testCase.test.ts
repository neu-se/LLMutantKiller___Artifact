// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/pull-stream/attempt_1/pending_category/mutant-3ccb689/testCase.test.ts
import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe('asyncMap mutation test', () => {
  it('should handle aborted state correctly', (done) => {
    const map = (data: any, cb: (err: any, result?: any) => void) => {
      setTimeout(() => cb(null, data * 2), 10);
    };

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        cb(null, 5);
      }
    };

    const mappedSource = asyncMap(map)(source);

    // First call to establish the stream
    mappedSource(null, (end: any, data: any) => {
      if (end) {
        // This should not happen on first call
        done(new Error('Unexpected end on first call'));
      } else if (data !== 5) {
        done(new Error(`Expected 5, got ${data}`));
      } else {
        // Now abort the stream
        mappedSource('ABORT_ERROR', (err: any) => {
          if (err !== 'ABORT_ERROR') {
            done(new Error(`Expected 'ABORT_ERROR', got ${err}`));
          } else {
            done();
          }
        });
      }
    });
  });
});