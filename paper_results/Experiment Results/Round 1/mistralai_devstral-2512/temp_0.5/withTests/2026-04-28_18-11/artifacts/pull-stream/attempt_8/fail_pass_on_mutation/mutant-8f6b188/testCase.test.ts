import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('drain mutation test', () => {
  it('should distinguish between true and error end values', (done) => {
    const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");
    const error = new Error('test error');
    let results: any[] = [];

    // Test with true end value
    const source1 = function (abort: any, cb: (end: any, data?: any) => void) {
      if (abort) cb(abort);
      else cb(true);
    };

    const sink1 = drain(null, (err: any) => {
      results.push({ case: 'true', err });
    });

    pull(source1, sink1);

    // Test with error end value
    const source2 = function (abort: any, cb: (end: any, data?: any) => void) {
      if (abort) cb(abort);
      else cb(error);
    };

    const sink2 = drain(null, (err: any) => {
      results.push({ case: 'error', err });
      // Verify both cases
      expect(results[0].err).toBeNull(); // true case
      expect(results[1].err).toBe(error); // error case
      done();
    });

    pull(source2, sink2);
  });
});