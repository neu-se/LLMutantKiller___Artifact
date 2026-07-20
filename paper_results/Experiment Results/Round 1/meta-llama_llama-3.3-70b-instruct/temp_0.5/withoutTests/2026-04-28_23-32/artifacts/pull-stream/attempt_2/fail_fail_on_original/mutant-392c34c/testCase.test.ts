import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should call callback with null error when stream ends with a false error', (done) => {
    const test = (data: any) => false;
    const cb = (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBeNull();
      done();
    };
    const stream = {
      pipe: (sink: any) => {
        sink(null, 'data');
        sink(false, null);
      }
    };
    stream.pipe(find(test, cb));
  });
});