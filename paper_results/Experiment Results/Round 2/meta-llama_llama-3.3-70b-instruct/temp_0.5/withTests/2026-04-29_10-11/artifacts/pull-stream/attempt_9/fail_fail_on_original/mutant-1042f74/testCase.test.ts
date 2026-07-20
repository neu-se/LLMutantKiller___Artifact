import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js"
import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"

describe('drain', () => {
  it('should handle asynchronous streams correctly', (done) => {
    let c = 0;
    const read = values([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    read(null, (end: boolean | null, data: any) => {
      if (end === true) return done();
      c++;
      if (c === 10) {
        try {
          expect(c).toBe(10);
          done();
        } catch (error) {
          done(error);
        }
      } else {
        read(null, (end: boolean | null, data: any) => {
          if (end === true) return done();
        });
      }
    });
  });
});