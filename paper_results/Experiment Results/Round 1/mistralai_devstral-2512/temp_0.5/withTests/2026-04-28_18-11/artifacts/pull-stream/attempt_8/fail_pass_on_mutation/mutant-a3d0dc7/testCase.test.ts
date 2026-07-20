const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values source behavior on abort', () => {
  it('should not trigger abort callback when abort is not true', (done) => {
    const testArray = [1, 2, 3];
    const read = values(testArray);

    // First normal read
    read(null, (end: any, data: any) => {
      expect(end).toBeNull();
      expect(data).toBe(1);

      // Call with abort = false (should not trigger abort)
      read(false, (end: any, data: any) => {
        // In original code: should continue normally and return next value
        // In mutated code: will trigger abortCb and call callback with false
        if (end === false) {
          fail('Abort was triggered incorrectly');
        }
        expect(data).toBe(2);
        done();
      });
    });
  });
});