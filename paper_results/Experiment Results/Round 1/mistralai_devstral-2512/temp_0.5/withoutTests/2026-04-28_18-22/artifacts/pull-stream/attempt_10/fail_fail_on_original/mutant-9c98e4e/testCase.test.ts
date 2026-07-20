import count from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe('count source', () => {
  it('should emit exactly max values when max is 0', (done) => {
    const max = 0;
    const source = count(max);
    let ended = false;

    source(null, (end: boolean, data: number) => {
      if (end) {
        ended = true;
        expect(ended).toBe(true);
        done();
      } else {
        done(new Error('Should not emit any values when max is 0'));
      }
    });
  });
});