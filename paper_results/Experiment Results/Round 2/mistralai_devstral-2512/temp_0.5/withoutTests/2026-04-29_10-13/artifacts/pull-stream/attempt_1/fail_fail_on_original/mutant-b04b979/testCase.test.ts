import { asyncMap } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe('asyncMap with null map function', () => {
  it('should pass through data unchanged when map is null', (done) => {
    const source = (abort, cb) => {
      if (abort) return cb(abort);
      cb(null, 'test-data');
    };

    const mappedSource = asyncMap(null)(source);

    mappedSource(null, (end, data) => {
      expect(end).toBeNull();
      expect(data).toBe('test-data');
      done();
    });
  });
});