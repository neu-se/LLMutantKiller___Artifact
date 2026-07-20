const once = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/once.js");

describe('once source abort behavior', () => {
  it('should immediately end when aborted before first read', (done) => {
    const read = once(42);

    // Abort before any read
    read(true, (end: any) => {
      expect(end).toBe(true);
      done();
    });
  });
});