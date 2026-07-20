const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values source', () => {
  it('should emit first value when abort is falsy', (done) => {
    const array = [1, 2, 3];
    const source = values(array);

    source(0, (end: any, data?: any) => {
      if (end === true) {
        done(new Error('Should not complete on first call'));
      } else if (end) {
        done(end);
      } else {
        expect(data).toBe(1);
        done();
      }
    });
  });
});