import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('values source abort behavior', () => {
  it('should read first value when abort is false', (done) => {
    const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");
    const read = values([1, 2, 3]);

    read(null, (end: any, data: any) => {
      expect(end).toBeNull();
      expect(data).toBe(1);
      done();
    });
  });
});