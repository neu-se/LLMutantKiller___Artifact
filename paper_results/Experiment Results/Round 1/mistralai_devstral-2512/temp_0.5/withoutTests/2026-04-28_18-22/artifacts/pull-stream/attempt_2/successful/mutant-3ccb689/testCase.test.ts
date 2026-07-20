// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/pull-stream/attempt_1/pending_category/mutant-3ccb689/testCase.test.ts
import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe('asyncMap mutation test', () => {
  it('should handle aborted state before data processing', (done) => {
    const map = (data: any, cb: (err: any, result?: any) => void) => {
      setTimeout(() => cb(null, data * 2), 10);
    };

    let callCount = 0;
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      callCount++;
      if (abort) {
        cb(abort);
      } else if (callCount === 1) {
        cb(null, 5);
      } else {
        cb(true); // End stream
      }
    };

    const mappedSource = asyncMap(map)(source);

    // First call to get data
    mappedSource(null, (end: any, data: any) => {
      if (end) {
        done(new Error('Unexpected end on first call'));
      } else if (data !== 10) {
        done(new Error(`Expected mapped value 10, got ${data}`));
      } else {
        // Abort immediately after first data
        mappedSource('ABORT_ERROR', (err: any) => {
          if (err !== 'ABORT_ERROR') {
            done(new Error(`Expected 'ABORT_ERROR', got ${err}`));
          } else {
            // Try to read again - should get abort error
            mappedSource(null, (end: any, data: any) => {
              if (end !== 'ABORT_ERROR') {
                done(new Error(`Expected 'ABORT_ERROR' on subsequent read, got ${end}`));
              } else {
                done();
              }
            });
          }
        });
      }
    });
  });
});