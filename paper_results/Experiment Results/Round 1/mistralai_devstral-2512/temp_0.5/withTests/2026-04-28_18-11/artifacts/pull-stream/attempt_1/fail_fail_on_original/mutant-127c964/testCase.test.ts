import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('values source with non-array input', () => {
  it('should handle object input correctly', (done) => {
    const input = { a: 1, b: 2, c: 3 };
    const expected = [1, 2, 3];

    pull(
      values(input),
      pull.collect((err, result) => {
        expect(err).toBeNull();
        expect(result).toEqual(expected);
        done();
      })
    );
  });
});