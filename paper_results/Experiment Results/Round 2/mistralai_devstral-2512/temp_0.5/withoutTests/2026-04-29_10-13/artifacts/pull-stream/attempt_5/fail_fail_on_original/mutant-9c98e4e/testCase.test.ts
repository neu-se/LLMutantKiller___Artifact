import count from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe('count source', () => {
  it('should emit values until reaching max (exclusive)', (done) => {
    const max = 2;
    const source = count(max);
    const results: number[] = [];

    let callCount = 0;
    source(null, (end: any, data: any) => {
      callCount++;
      if (end) {
        expect(results).toEqual([0, 1]);
        expect(callCount).toBe(3); // 2 data calls + 1 end call
        done();
        return;
      }
      results.push(data);
      if (callCount === max) {
        source(true, () => {});
      }
    });
  });
});