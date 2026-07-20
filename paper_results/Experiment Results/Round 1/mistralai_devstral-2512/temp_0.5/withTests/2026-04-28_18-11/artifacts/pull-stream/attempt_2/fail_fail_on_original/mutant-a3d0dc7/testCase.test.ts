import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('values source behavior on non-abort read', () => {
  it('should read values normally when abort is not true', (done) => {
    const testArray = [1, 2, 3];
    let readCount = 0;
    const expectedValues = [...testArray];

    const read = pull.values(testArray);

    function nextRead() {
      read(null, (end: any, data: any) => {
        if (end) {
          expect(readCount).toBe(testArray.length);
          done();
          return;
        }
        expect(data).toBe(expectedValues[readCount]);
        readCount++;
        nextRead();
      });
    }

    nextRead();
  });
});