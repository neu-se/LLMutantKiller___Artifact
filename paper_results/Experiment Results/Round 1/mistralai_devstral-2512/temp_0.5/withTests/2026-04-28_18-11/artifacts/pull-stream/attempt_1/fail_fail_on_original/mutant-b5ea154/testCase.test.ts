import { map } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/map.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('map with null mapper', () => {
  it('should use identity function when mapper is null', (done) => {
    pull(
      pull.values([1, 2, 3]),
      map(null),
      pull.collect((err, result) => {
        expect(err).toBeNull();
        expect(result).toEqual([1, 2, 3]);
        done();
      })
    );
  });
});