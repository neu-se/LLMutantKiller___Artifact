import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream"

describe('drain', () => {
  it('should handle asynchronous streams correctly', (done) => {
    let c = 0;
    const read = pull(
      pull.values([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      pull.drain(() => {
        c++;
      }, (err) => {
        try {
          expect(c).toBe(10);
          done();
        } catch (error) {
          done(error);
        }
      })
    );

    read(null, () => {});
  });
});