const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values source', () => {
  it('should not immediately abort when no abort signal is given', (done) => {
    const array = [1, 2, 3];
    const source = values(array);

    let callCount = 0;
    const mockCb = (end: any, data?: any) => {
      callCount++;
      if (end === true) {
        expect(callCount).toBe(4); // 3 data calls + 1 end call
        done();
      } else if (end) {
        done(end);
      }
    };

    // First call without abort
    source(null, mockCb);
    // Subsequent calls would continue the sequence
    source(null, mockCb);
    source(null, mockCb);
    source(null, mockCb);
  });
});