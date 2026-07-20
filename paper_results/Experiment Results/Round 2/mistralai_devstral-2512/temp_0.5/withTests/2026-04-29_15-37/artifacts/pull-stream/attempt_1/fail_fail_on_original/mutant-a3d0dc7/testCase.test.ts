import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('values source with abort', () => {
  it('should not abort immediately when abort is false', (done) => {
    const read = values([1, 2, 3], (err) => {
      done();
    });

    let firstCall = true;
    read(null, (end, data) => {
      if (firstCall) {
        firstCall = false;
        expect(end).toBeNull();
        expect(data).toBe(1);
        read(true, (abortEnd) => {
          expect(abortEnd).toBe(true);
        });
      }
    });
  });
});