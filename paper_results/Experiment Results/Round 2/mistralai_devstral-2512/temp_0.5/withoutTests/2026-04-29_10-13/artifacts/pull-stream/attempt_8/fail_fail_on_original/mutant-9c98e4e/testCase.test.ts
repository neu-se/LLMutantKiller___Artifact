import count from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe('count source', () => {
  it('should emit exactly max values when max is 1', (done) => {
    const source = count(1);
    const results: number[] = [];

    source(null, (end: any, data: any) => {
      if (end) {
        expect(results).toEqual([0]);
        done();
        return;
      }
      results.push(data);
      if (results.length >= 1) {
        source(true, () => {});
      }
    });
  });
});