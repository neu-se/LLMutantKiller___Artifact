const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values source', () => {
  it('should emit values when no abort is provided', (done) => {
    const array = [1, 2, 3];
    const source = values(array);

    let receivedValues: number[] = [];
    let completed = false;

    function read() {
      source(null, (end: any, data?: any) => {
        if (end === true) {
          completed = true;
          expect(receivedValues).toEqual([1, 2, 3]);
          expect(completed).toBe(true);
          done();
        } else if (end) {
          done(end);
        } else {
          receivedValues.push(data);
          read();
        }
      });
    }

    read();
  });
});