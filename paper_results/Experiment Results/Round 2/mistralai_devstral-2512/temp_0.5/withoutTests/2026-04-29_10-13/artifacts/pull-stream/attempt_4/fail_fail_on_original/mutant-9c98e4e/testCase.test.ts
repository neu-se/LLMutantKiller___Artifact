import count from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe('count source', () => {
  it('should emit exactly max values when max is 0', (done) => {
    const source = count(0);
    const results: number[] = [];

    source(null, (end: any, data: any) => {
      if (end) {
        expect(results).toEqual([]);
        done();
        return;
      }
      results.push(data);
    });
  });
});