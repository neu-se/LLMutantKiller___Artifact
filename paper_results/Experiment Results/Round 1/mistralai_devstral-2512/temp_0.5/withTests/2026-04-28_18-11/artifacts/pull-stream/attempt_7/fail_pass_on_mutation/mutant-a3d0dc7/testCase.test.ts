const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values source behavior on abort', () => {
  it('should not trigger abort when called with non-true value', (done) => {
    const testArray = [1, 2, 3];
    const read = values(testArray);
    let callbackCount = 0;

    // First normal read
    read(null, (end: any, data: any) => {
      expect(end).toBeNull();
      expect(data).toBe(1);
      callbackCount++;

      // Call with abort = false (should not trigger abort)
      read(false, (end: any, data: any) => {
        // In original code: should continue normally
        // In mutated code: will trigger abortCb and call callback with false
        expect(end).toBeNull();
        expect(data).toBe(2);
        callbackCount++;
        done();
      });
    });
  });
});