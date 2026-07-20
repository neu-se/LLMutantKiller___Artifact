const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values with null input', () => {
  it('should handle null input by returning end=true immediately', (done) => {
    const read = values(null);
    let callbackCount = 0;

    read(null, (end: any, data: any) => {
      callbackCount++;
      expect(end).toBe(true);
      expect(data).toBeUndefined();
      expect(callbackCount).toBe(1);
      done();
    });
  });
});