const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink', () => {
  it('should handle empty stream correctly', (done) => {
    const reducer = (acc: number | null, data: number): number => {
      return acc === null ? data : acc + data;
    };

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      cb(true); // End the stream immediately without any data
    };

    reduce(reducer, null, (err: any, result: number | null) => {
      expect(err).toBeNull();
      expect(result).toBeNull(); // Should be null since no data was processed
      done();
    })(source);
  });
});