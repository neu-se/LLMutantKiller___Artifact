import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream";

describe('flatten', () => {
  it('should handle abort correctly', (done) => {
    const source = pull.values([1, 2, 3]);
    const stream = pull(
      source,
      pull.flatten(),
    );

    stream(true, function (err: any) {
      expect(err).toBe(true);
      done();
    });
  });
});