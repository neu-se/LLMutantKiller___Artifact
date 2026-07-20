import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('find', () => {
  it('should handle missing callback by using test as callback', (done) => {
    const test = (data: any) => data === 'target';
    const cb = (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBe('target');
      done();
    };

    const source = values(['a', 'b', 'target', 'c']);

    // This should trigger the mutation where !cb is replaced with false
    pull(source, find(test));
  });
});