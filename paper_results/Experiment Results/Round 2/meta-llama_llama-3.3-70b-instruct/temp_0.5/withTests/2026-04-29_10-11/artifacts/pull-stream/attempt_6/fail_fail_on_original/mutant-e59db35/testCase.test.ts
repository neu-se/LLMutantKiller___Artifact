import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream";

describe('flatten', () => {
  it('should handle abort correctly', (done) => {
    const sourceStream = pull.values([pull.values([1, 2, 3]), pull.values([4, 5, 6])]);
    const stream = pull(
      sourceStream,
      pull.flatten(),
    );

    stream(true, function (err: any) {
      expect(err).toBe(true);
      done();
    });
  });
});