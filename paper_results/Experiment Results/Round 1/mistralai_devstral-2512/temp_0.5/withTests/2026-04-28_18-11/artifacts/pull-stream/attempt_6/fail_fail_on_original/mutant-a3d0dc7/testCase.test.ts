const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values source behavior on abort', () => {
  it('should continue reading when abort is not true', (done) => {
    const testArray = [1, 2, 3];
    const read = values(testArray);
    let readCount = 0;

    function nextRead() {
      read(false, (end: any, data: any) => {
        if (end === true) {
          expect(readCount).toBe(3);
          done();
          return;
        }
        expect(data).toBe(testArray[readCount]);
        readCount++;
        if (readCount < testArray.length) {
          nextRead();
        }
      });
    }

    nextRead();
  });
});