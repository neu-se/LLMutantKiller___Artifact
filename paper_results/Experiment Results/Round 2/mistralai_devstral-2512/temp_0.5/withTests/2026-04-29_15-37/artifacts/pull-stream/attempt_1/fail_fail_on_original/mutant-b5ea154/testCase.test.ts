import { map } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/map.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('map with null mapper', () => {
  it('should use identity function when mapper is null', (done) => {
    const input = [1, 2, 3, 4, 5];
    pull(
      pull.values(input),
      map(null),
      pull.collect((err, result) => {
        expect(err).toBeNull();
        expect(result).toEqual(input);
        done();
      })
    );
  });
});