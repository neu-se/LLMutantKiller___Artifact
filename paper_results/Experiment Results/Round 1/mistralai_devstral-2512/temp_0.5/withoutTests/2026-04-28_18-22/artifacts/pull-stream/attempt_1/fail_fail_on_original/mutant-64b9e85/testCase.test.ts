import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find sink', () => {
  it('should call callback with error when stream ends without match', (done) => {
    const test = (data: any) => data === 'match';
    const cb = (err: Error | null, data: any) => {
      expect(err).toBeInstanceOf(Error);
      expect(data).toBeNull();
      done();
    };

    const source = {
      read: () => {
        return null; // Simulate end of stream
      }
    };

    const sink = find(test, cb);
    sink(source);
  });
});