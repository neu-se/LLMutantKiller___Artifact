import count from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe('count source', () => {
  it('should emit values from 0 to max-1 and end when reaching max', (done) => {
    const max = 5;
    const source = count(max);
    const results: number[] = [];

    source(null, (end: any, data: number) => {
      if (end) {
        expect(results).toEqual([0, 1, 2, 3, 4]);
        expect(end).toBe(true);
        done();
      } else {
        results.push(data);
      }
    });
  });
});