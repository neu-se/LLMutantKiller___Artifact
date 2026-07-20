import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('values source abort behavior', () => {
  it('should not abort when abort is false', (done) => {
    const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");
    const read = values([1, 2, 3]);

    read(null, (end: any, data: any) => {
      expect(end).toBeNull();
      expect(data).toBe(1);

      // This should not trigger abort behavior
      read(false, (end2: any, data2: any) => {
        expect(end2).toBeNull();
        expect(data2).toBe(2);
        done();
      });
    });
  });
});