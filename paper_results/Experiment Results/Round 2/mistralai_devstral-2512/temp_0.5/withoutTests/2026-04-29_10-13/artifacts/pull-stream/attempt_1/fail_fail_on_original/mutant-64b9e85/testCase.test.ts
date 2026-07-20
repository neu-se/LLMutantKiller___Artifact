import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find sink', () => {
  it('should call callback with error when stream ends without match', (done) => {
    const testFn = (data: any) => data === 'target';
    const callback = (err: Error | null, result: any) => {
      expect(err).toBeInstanceOf(Error);
      expect(result).toBeNull();
      done();
    };

    const source = {
      read: () => {
        // Return null to signal end of stream
        return null;
      }
    };

    const sink = find(testFn, callback);
    sink(source);
  });
});