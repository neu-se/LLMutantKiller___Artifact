const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/index.js");

describe('drain mutation test', () => {
  it('should handle synchronous data processing correctly', (done) => {
    const input = [1, 2, 3];
    const results: number[] = [];
    let readCount = 0;

    const source = pull.values(input);
    const drainStream = pull.drain((data: number) => {
      results.push(data);
      readCount++;
    }, () => {
      expect(results).toEqual([1, 2, 3]);
      expect(readCount).toBe(3);
      done();
    });

    // Manually drive the stream to test synchronous behavior
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