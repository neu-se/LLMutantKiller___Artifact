import { asyncMap } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe('asyncMap', () => {
  it('should return the original value when map function is not provided', (done) => {
    const source = (end, cb) => {
      cb(null, 'test');
    };
    const asyncMapStream = asyncMap();
    asyncMapStream(source, (end, data) => {
      if (end) {
        done(end);
      } else {
        expect(data).toBe('test');
        done();
      }
    });
  });
});