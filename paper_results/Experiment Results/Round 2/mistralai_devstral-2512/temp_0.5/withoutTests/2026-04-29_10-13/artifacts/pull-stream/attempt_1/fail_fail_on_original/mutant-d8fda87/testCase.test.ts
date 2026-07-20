import { once } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/once.js";

describe('once source', () => {
  it('should call callback with true when aborted before value is consumed', (done) => {
    const source = once(42);
    const abort = true;
    const cb = (end, value) => {
      expect(end).toBe(true);
      expect(value).toBeUndefined();
      done();
    };
    source(abort, cb);
  });
});