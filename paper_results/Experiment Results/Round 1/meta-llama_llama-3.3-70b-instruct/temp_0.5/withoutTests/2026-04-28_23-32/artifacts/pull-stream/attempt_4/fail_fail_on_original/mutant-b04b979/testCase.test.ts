import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe('asyncMap', () => {
  it('should return the original value when map function is not provided', (done) => {
    const source = (read: (end: any, cb: (end: any, data: any) => void) => void) => {
      read(null, (end: any, data: any) => {
        if (end) {
          done(end);
        } else {
          expect(data).toBeUndefined();
          done();
        }
      });
    };
    const asyncMapStream = asyncMap(null);
    asyncMapStream(source, (end: any, data: any) => {
      if (end) {
        done(end);
      } else {
        expect(data).toBeUndefined();
        done();
      }
    });
  });
});