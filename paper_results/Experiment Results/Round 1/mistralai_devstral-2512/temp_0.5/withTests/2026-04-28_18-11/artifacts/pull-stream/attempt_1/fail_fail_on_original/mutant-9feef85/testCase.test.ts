import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('values with null input', () => {
  it('should call callback with true when array is null', (done) => {
    const read = values(null);
    read(null, (end: any, data: any) => {
      expect(end).toBe(true);
      expect(data).toBeUndefined();
      done();
    });
  });
});