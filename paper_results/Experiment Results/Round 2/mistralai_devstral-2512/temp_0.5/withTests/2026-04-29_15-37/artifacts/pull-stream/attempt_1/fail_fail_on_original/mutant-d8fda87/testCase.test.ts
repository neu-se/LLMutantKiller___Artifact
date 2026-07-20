import { once } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/once.js";

describe('once source behavior on abort', () => {
  it('should call callback with true when abort is true', (done) => {
    const source = once(42);
    source(true, (end, data) => {
      expect(end).toBe(true);
      expect(data).toBeUndefined();
      done();
    });
  });
});