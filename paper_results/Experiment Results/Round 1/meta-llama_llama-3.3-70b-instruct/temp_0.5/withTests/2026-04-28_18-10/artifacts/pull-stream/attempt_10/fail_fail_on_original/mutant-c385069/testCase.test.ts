import { asyncMap } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";
import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";
import { collect } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js";

describe('asyncMap', () => {
  it('should handle abort correctly', (done) => {
    const source = values([1, 2, 3]);
    const mapped = asyncMap((data: any, cb: (err: any, data: any) => void) => {
      cb(null, data);
    });
    collect(mapped(source), (err: any, data: any) => {
      if (err) {
        done(err);
      } else {
        expect(data).toEqual([1, 2, 3]);
        done();
      }
    });
  });
});