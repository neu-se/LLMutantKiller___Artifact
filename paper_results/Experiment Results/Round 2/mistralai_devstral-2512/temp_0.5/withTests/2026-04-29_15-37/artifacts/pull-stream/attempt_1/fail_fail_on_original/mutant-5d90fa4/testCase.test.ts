import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('values with null input', () => {
  it('should handle null input by returning empty stream', (done) => {
    pull(
      values(null),
      pull.collect((err, ary) => {
        expect(err).toBeNull();
        expect(ary).toEqual([]);
        done();
      })
    );
  });
});