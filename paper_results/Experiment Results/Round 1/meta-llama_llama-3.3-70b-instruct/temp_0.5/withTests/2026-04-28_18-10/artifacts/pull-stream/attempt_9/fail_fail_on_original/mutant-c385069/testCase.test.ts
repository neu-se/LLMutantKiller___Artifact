import pull from "../../../../../../../../../../../subject_repositories/pull-stream/index.js";

describe('asyncMap', () => {
  it('should handle abort correctly', (done) => {
    const source = pull(
      pull.values([1, 2, 3]),
      pull.asyncMap((data: any, cb: (err: any, data: any) => void) => {
        cb(null, data);
      })
    );
    let called = false;
    pull(
      source,
      pull.collect((err: any, data: any) => {
        called = true;
        expect(data).toEqual([1, 2, 3]);
        pull(
          source,
          pull.collect((err: any, data: any) => {
            if (err) {
              done(err);
            } else {
              expect(data).toEqual([1, 2, 3]);
              expect(called).toBe(true);
              done();
            }
          })
        );
      })
    );
  });
});