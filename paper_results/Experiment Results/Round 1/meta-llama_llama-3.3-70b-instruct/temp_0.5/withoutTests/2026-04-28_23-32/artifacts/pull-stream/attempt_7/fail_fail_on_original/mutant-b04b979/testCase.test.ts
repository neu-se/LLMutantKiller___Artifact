import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe('asyncMap', () => {
  it('should return the original value when map function is not provided', (done) => {
    const source = (read) => {
      read(null, (end, data) => {
        if (end) {
          done(end);
        } else {
          expect(data).not.toBeUndefined();
          done();
        }
      });
    };
    const asyncMapStream = asyncMap(null);
    asyncMapStream(source, (end, data) => {
      if (end) {
        done(end);
      } else {
        expect(data).not.toBeUndefined();
        done();
      }
    });
  });
});