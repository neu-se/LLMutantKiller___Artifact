import { asyncMap } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('asyncMap with null mapper', () => {
  it('should pass through values when mapper is null', (done) => {
    const input = [1, 2, 3, 4, 5];
    const expected = [1, 2, 3, 4, 5];

    pull(
      pull.values(input),
      asyncMap(null),
      pull.collect((err, result) => {
        expect(err).toBeNull();
        expect(result).toEqual(expected);
        done();
      })
    );
  });
});