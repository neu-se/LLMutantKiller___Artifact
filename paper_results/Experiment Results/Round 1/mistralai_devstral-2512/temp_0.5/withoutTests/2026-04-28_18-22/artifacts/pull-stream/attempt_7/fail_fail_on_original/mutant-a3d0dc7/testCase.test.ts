const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values source', () => {
  it('should emit values when abort is not truthy', (done) => {
    const array = [1, 2, 3];
    const source = values(array);

    let callCount = 0;
    const expectedValues = [1, 2, 3];

    function read() {
      source(0, (end: any, data?: any) => {
        callCount++;
        if (end === true) {
          expect(callCount).toBe(4); // 3 values + 1 end
          done();
        } else if (end) {
          done(end);
        } else {
          expect(data).toBe(expectedValues[callCount - 1]);
          if (callCount < 3) {
            read();
          }
        }
      });
    }

    read();
  });
});