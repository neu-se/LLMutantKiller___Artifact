import count from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe('count source', () => {
  it('should emit exactly max values when max is finite', (done) => {
    const max = 3;
    const source = count(max);
    const results: number[] = [];
    let callCount = 0;

    source(null, (end: any, data: number) => {
      callCount++;
      if (end) {
        expect(results).toEqual([0, 1, 2]);
        expect(callCount).toBe(4); // 3 data calls + 1 end call
        done();
      } else {
        results.push(data);
        if (callCount > max + 1) {
          done(new Error(`Expected to end after ${max} values but got more`));
        }
      }
    });
  });
});