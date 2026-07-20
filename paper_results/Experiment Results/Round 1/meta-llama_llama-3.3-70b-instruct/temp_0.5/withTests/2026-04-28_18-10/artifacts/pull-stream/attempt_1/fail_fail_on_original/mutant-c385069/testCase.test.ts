import { asyncMap } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";
import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";
import { collect } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js";

describe('asyncMap', () => {
  it('should call read with abort when busy is false', (done) => {
    const read = jest.fn();
    const asyncMapStream = asyncMap((data, cb) => {
      cb(null, data);
    });
    const stream = values([1, 2, 3], () => {});
    const resultStream = asyncMapStream(stream);
    resultStream(true, (err, data) => {
      expect(read).not.toHaveBeenCalled();
      expect(err).toBe(true);
      done();
    });
  });
});