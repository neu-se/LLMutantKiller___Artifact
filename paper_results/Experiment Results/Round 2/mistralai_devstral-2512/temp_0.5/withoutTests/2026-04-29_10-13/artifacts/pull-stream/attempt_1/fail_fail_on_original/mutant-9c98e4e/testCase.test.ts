import count from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe('count source', () => {
  it('should stop emitting values when reaching max (exclusive)', (done) => {
    const max = 5;
    const source = count(max);
    const results: number[] = [];

    let ended = false;
    source(null, (end: any, data: any) => {
      if (end) {
        ended = true;
        expect(results).toEqual([0, 1, 2, 3, 4]);
        expect(ended).toBe(true);
        done();
        return;
      }
      results.push(data);
    });
  });
});