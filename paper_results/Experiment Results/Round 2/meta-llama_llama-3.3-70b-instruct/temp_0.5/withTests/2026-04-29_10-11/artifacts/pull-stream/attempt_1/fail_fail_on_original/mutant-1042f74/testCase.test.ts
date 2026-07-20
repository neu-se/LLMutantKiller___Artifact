import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js"

describe('drain', () => {
  it('should handle synchronous streams correctly', (done) => {
    let c = 0;
    const read = drain(() => {
      c++;
      if (c >= 10) return false;
    }, () => {
      try {
        expect(c).toBe(10);
        done();
      } catch (error) {
        done(error);
      }
    });

    for (let i = 0; i < 10; i++) {
      read(null, () => {});
    }
  });
});