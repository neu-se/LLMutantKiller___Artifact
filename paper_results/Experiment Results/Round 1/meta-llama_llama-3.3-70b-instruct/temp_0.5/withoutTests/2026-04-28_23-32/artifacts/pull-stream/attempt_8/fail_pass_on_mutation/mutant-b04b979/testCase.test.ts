import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe('asyncMap', () => {
  it('should return the original value when map function is not provided', (done) => {
    const source = (read: (abort: any, cb: (end: any, data: any) => void) => void) => {
      read(null, (end: any, data: any) => {
        if (end) {
          done(end);
        } else {
          expect(data).toBe('test');
          done();
        }
      });
    };
    const asyncMapStream = asyncMap((data: any) => {
      return data;
    });
    asyncMapStream(source, (end: any, data: any) => {
      if (end) {
        done(end);
      } else {
        expect(data).toBe('test');
        done();
      }
    });
    source((abort: any, cb: (end: any, data: any) => void) => {
      cb(null, 'test');
    });
  });
});