import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('find', () => {
  it('should call the callback with the matching data when test is a function and cb is provided', (done) => {
    const test = (data: any) => data === 'target';
    const cb = (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBe('target');
      done();
    };

    const source = values(['a', 'b', 'target', 'c']);

    pull(source, find(test, cb));
  });
});