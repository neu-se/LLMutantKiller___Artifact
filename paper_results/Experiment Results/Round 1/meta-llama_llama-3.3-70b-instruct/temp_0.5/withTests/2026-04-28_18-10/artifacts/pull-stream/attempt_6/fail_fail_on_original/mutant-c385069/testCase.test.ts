import pull from "../../../../../../../../../../../subject_repositories/pull-stream/index.js";

describe('asyncMap', () => {
  it('should handle abort correctly', (done) => {
    const source = pull.values([1, 2, 3]);
    const mapped = pull(
      pull.asyncMap((data: any, cb: (err: any, data: any) => void) => {
        cb(null, data);
      }),
      pull.collect((err: any, data: any) => {
        if (err) {
          done(err);
        } else {
          expect(data).toEqual([1, 2, 3]);
          done();
        }
      })
    );
    const result = mapped(source);
    result(true, (err: any) => {
      if (err) {
        done(err);
      } else {
        done();
      }
    });
  });
});