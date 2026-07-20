import pull from "../../../../../../../../../../../subject_repositories/pull-stream";
import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values";
import { flatten } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten";

describe('flatten', () => {
  it('should handle abort correctly', (done) => {
    const sourceStream = values([values([1, 2, 3]), values([4, 5, 6])]);
    const stream = flatten()(sourceStream);

    stream(true, function (err: any) {
      expect(err).toBe(true);
      done();
    });
  });
});