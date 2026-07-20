import count from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe('count source', () => {
  it('should emit exactly max values and end', (done) => {
    const max = 3;
    const source = count(max);
    const values: number[] = [];
    let ended = false;

    source(null, (end: boolean, data: number) => {
      if (end) {
        ended = true;
        expect(values).toEqual([0, 1, 2]);
        expect(ended).toBe(true);
        done();
      } else {
        values.push(data);
        if (values.length >= max) {
          done(new Error(`Should have ended after emitting ${max} values`));
        }
      }
    });
  });
});