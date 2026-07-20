import count from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe('count source', () => {
  it('should emit exactly max values when max is 1', (done) => {
    const source = count(1);
    let callCount = 0;
    let ended = false;

    source(null, (end: any, data: any) => {
      callCount++;
      if (end) {
        ended = true;
        expect(callCount).toBe(2); // 1 data call + 1 end call
        done();
        return;
      }
      expect(data).toBe(0);
      if (callCount === 1) {
        source(true, () => {});
      }
    });
  });
});