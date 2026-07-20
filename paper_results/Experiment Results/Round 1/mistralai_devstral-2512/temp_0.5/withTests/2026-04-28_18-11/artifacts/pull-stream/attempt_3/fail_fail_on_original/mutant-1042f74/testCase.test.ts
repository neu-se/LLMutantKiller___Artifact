const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");
const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('drain mutation test', () => {
  it('should process data correctly when cbed is initially false', (done) => {
    const input = [1, 2, 3];
    const results: number[] = [];
    let callCount = 0;

    const drainStream = drain((data: number) => {
      callCount++;
      results.push(data);
    }, () => {
      expect(results).toEqual([1, 2, 3]);
      expect(callCount).toBe(3);
      done();
    });

    const source = values(input);
    source(null, (end: any, data: any) => {
      if (end) return;
      drainStream(null, (end: any) => {
        if (end) {
          drainStream.abort();
        }
      });
    });
  });
});