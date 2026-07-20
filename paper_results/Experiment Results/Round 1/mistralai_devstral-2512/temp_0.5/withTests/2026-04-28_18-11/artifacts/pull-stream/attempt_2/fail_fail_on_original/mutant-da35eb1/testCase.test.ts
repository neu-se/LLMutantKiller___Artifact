import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('find error handling', () => {
  it('should pass error when stream ends with error', (done) => {
    const error = new Error('test error');
    const source = pull.values([1, 2, 3]);
    const asyncMap = pull.asyncMap((data: any, cb: any) => {
      if (data === 2) {
        cb(error);
      } else {
        cb(null, data);
      }
    });
    const findSink = find(null, (err: any, result: any) => {
      expect(err).toBe(error);
      expect(result).toBeNull();
      done();
    });
    pull(source, asyncMap, findSink);
  });
});