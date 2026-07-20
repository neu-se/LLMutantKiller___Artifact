import { asyncMap } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";
import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";
import { collect } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js";

describe('asyncMap', () => {
  it('should handle abort correctly', (done) => {
    const source = values([1, 2, 3]);
    const mapped = asyncMap((data, cb) => {
      cb(null, data);
    });
    const result = mapped(source);
    let ended = false;
    result(null, (end, data) => {
      if (end === true) {
        ended = true;
      }
    });
    result(true, (end, data) => {
      if (end === true) {
        expect(ended).toBe(true);
        done();
      }
    });
  });
});