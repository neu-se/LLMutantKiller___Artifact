const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values source behavior on abort', () => {
  it('should handle abort correctly when called with non-true value', (done) => {
    const testArray = [1, 2, 3];
    const read = values(testArray);
    let callbackCalled = false;

    // First read to get the first value
    read(null, (end: any, data: any) => {
      expect(end).toBeNull();
      expect(data).toBe(1);

      // Now call with abort = false (not true)
      read(false, (end: any, data: any) => {
        // In original code, this should NOT trigger abortCb
        // In mutated code, this WILL trigger abortCb because of "if(true)"
        callbackCalled = true;
        expect(end).toBe(false);
        expect(data).toBeUndefined();
        done();
      });
    });
  });
});