const once = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/once.js");

describe('once source', () => {
  it('should abort immediately when abort is true', (done) => {
    const source = once(42);
    const abort = true;
    const cb = (end: any, value: any) => {
      expect(end).toBe(true);
      expect(value).toBeUndefined();
      done();
    };
    source(abort, cb);
  });
});