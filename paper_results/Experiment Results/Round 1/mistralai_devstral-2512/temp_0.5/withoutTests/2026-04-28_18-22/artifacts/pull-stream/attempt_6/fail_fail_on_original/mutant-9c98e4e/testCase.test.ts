import count from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe('count source', () => {
  it('should emit values from 0 to max-1 and end when i equals max', (done) => {
    const max = 2;
    const source = count(max);
    const values: number[] = [];
    let callCount = 0;

    source(null, (end: boolean, data: number) => {
      callCount++;
      if (end) {
        expect(values).toEqual([0, 1]);
        expect(callCount).toBe(3); // 2 data + 1 end
        done();
      } else {
        values.push(data);
        if (callCount > max + 1) {
          done(new Error(`Expected to end after ${max} values`));
        }
      }
    });
  });
});