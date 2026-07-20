const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values source', () => {
  it('should not abort immediately when abort is not called', (done) => {
    const array = [1, 2, 3];
    const source = values(array);

    let callCount = 0;
    const expectedCalls = 4; // 3 data + 1 end

    source(null, (end: boolean | null, data?: number) => {
      callCount++;
      if (end === true) {
        expect(callCount).toBe(expectedCalls);
        done();
      } else if (end === null && data !== undefined) {
        expect(data).toBe(array[callCount - 1]);
      }
    });
  });
});