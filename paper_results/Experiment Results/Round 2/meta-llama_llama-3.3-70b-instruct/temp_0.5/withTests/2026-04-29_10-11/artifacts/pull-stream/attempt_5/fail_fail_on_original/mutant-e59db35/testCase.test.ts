import { values, flatten } from "../../../../../../../../../../../subject_repositories/pull-stream";

describe('flatten', () => {
  it('should handle abort correctly', (done) => {
    const source = values([1, 2, 3]);
    const stream = flatten();

    stream(true, function (err: any) {
      expect(err).toBe(true);
      done();
    });
  });
});