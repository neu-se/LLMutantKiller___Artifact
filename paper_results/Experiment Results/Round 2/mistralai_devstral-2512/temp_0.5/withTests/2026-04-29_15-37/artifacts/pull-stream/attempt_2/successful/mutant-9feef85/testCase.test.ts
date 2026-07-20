import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('values with null input', () => {
  it('should handle null input by returning an ended source', (done) => {
    const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");
    const read = values(null);
    read(null, (end: any, data: any) => {
      expect(end).toBe(true);
      expect(data).toBeUndefined();
      done();
    });
  });
});