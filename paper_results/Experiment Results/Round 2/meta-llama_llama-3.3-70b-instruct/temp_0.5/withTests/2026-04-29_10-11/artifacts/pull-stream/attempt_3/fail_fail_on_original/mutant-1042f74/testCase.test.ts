import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js"

describe('drain', () => {
  it('should handle asynchronous streams correctly', (done) => {
    let c = 0;
    const stream = drain(() => {
      c++;
    }, () => {
      try {
        expect(c).toBe(10);
        done();
      } catch (error) {
        done(error);
      }
    });

    for (let i = 0; i < 10; i++) {
      stream(null, () => {});
    }
  });
});