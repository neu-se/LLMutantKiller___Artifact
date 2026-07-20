import count from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe('count source', () => {
  it('should emit exactly max values when max is finite', (done) => {
    const max = 3;
    const source = count(max);
    const results: number[] = [];

    source(null, (end: any, data: any) => {
      if (end) {
        expect(results).toEqual([0, 1, 2]);
        done();
        return;
      }
      results.push(data);
      if (results.length >= max) {
        source(true, () => {});
      }
    });
  });
});