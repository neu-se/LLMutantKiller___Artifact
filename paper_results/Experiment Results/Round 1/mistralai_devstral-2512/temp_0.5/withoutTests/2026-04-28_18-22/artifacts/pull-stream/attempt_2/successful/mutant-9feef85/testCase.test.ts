const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values function with null input', () => {
  it('should call callback with true when array is null', (done) => {
    const source = values(null);
    source(null, (end: boolean, data: any) => {
      expect(end).toBe(true);
      done();
    });
  });
});