const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink', () => {
  it('should process multiple data chunks before ending', (done) => {
    const reducer = (acc: number | null, data: number) => (acc || 0) + data;
    let calls = 0;
    const source = (abort: any, cb: (end: boolean | Error, data?: number) => void) => {
      if (calls === 0) cb(false, 10);
      else if (calls === 1) cb(false, 20);
      else if (calls === 2) cb(false, 30);
      else if (calls === 3) cb(true); // End stream
      calls++;
    };

    reduce(reducer, 0, (err: Error | null, result: number | null) => {
      expect(err).toBeNull();
      expect(result).toBe(60); // 10 + 20 + 30
      done();
    })(source);
  });
});