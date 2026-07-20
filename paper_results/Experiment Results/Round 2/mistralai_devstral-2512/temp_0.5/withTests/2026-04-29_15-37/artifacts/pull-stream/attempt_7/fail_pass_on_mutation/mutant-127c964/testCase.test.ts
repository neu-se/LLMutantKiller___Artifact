const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values with null input behavior', () => {
  it('should return end=true on first read when input is null', (done) => {
    const read = values(null);
    let firstCall = true;

    read(null, (end: any, data: any) => {
      if (firstCall) {
        firstCall = false;
        expect(end).toBe(true);
        expect(data).toBeUndefined();
        done();
      }
    });
  });
});