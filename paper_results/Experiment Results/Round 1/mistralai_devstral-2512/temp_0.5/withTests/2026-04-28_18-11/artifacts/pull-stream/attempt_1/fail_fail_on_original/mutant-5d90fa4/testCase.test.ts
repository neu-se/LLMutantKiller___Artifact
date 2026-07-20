import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/index.js";

describe('values with null input', () => {
  it('should handle null input gracefully', (done) => {
    const read = values(null);
    read(null, (end, data) => {
      expect(end).toBe(true);
      expect(data).toBeUndefined();
      done();
    });
  });
});