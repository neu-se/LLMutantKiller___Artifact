const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values source', () => {
  it('should not abort when abort parameter is null', (done) => {
    const array = [1, 2, 3];
    const source = values(array);

    source(null, (end: any, data?: any) => {
      if (end === true) {
        done(new Error('Should not complete immediately'));
      } else if (end) {
        done(end);
      } else {
        expect(data).toBe(1);
        done();
      }
    });
  });
});