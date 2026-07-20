const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values with null input', () => {
  it('should handle null input correctly', (done) => {
    const read = values(null);
    read(null, (end: any, data: any) => {
      expect(end).toBe(true);
      expect(data).toBeUndefined();
      done();
    });
  });
});