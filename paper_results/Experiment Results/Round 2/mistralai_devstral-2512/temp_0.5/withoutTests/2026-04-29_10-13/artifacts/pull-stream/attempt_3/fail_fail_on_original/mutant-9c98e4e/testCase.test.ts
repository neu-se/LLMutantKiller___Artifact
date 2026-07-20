import count from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe('count source', () => {
  it('should emit values up to but not including max', (done) => {
    const max = 3;
    const source = count(max);
    const results: number[] = [];

    let callCount = 0;
    const maxCalls = max + 1; // One extra call to trigger the end condition

    source(null, (end: any, data: any) => {
      callCount++;
      if (end) {
        expect(results).toEqual([0, 1, 2]);
        expect(callCount).toBe(max + 1); // end call + data calls
        done();
        return;
      }
      results.push(data);
      if (callCount >= maxCalls) {
        source(true, () => {});
      }
    });
  });
});