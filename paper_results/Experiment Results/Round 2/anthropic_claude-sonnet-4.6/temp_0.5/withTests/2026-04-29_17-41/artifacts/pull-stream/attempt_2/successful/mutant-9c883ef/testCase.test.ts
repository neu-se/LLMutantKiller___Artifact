import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('find', () => {
  it('should find the first element when called with only a callback and no test function', (done) => {
    const source = values([10, 20, 30]);
    const sink = find(function(err: any, result: any) {
      expect(err).toBeNull();
      expect(result).toBe(10);
      done();
    });
    sink(source);
  });
});