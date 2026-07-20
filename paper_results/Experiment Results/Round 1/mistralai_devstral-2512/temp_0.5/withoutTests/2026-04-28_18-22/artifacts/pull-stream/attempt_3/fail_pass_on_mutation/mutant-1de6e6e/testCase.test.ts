const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink', () => {
  it('should handle empty stream correctly', (done) => {
    const reducer = (acc: number | null, data: number) => (acc || 0) + data;
    const source = (abort: any, cb: (end: boolean | Error, data?: number) => void) => {
      cb(true); // End the stream immediately without any data
    };

    reduce(reducer, 0, (err: Error | null, result: number | null) => {
      expect(err).toBeNull();
      expect(result).toBe(0); // Initial value since no data was processed
      done();
    })(source);
  });
});