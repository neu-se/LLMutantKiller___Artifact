import count from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe('count source', () => {
  it('should emit values up to max-1 and end at max', (done) => {
    const max = 1;
    const source = count(max);
    let callCount = 0;
    let ended = false;

    source(null, (end: boolean, data: number) => {
      callCount++;
      if (end) {
        ended = true;
        expect(callCount).toBe(2); // 1 data + 1 end
        expect(ended).toBe(true);
        done();
      } else {
        expect(data).toBe(0);
        if (callCount > max + 1) {
          done(new Error(`Should have ended after ${max} value`));
        }
      }
    });
  });
});