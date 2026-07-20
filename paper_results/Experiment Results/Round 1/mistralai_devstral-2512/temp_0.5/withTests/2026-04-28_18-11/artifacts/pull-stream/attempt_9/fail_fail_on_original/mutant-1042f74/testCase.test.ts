const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/index.js");

describe('drain mutation test', () => {
  it('should process data synchronously without premature termination', (done) => {
    const input = [1, 2, 3];
    const results: number[] = [];
    let readCalls = 0;

    const source = pull.values(input);
    const drainStream = pull.drain(
      (data: number) => {
        results.push(data);
      },
      (err: any) => {
        expect(results).toEqual([1, 2, 3]);
        expect(readCalls).toBeGreaterThan(0);
        done();
      }
    );

    // Manually drive the stream to test the synchronous behavior
    source(null, (end: any, data: any) => {
      readCalls++;
      if (end) return;
      drainStream(null, (end: any) => {
        if (end) {
          drainStream.abort();
        }
      });
    });
  });
});