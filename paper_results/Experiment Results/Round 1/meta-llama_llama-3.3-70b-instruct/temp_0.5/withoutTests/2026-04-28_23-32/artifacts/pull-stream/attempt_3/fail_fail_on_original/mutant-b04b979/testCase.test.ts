import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe('asyncMap', () => {
  it('should return the original value when map function is not provided', (done) => {
    const source = (read) => {
      read(null, null, 'test');
    };
    const asyncMapStream = asyncMap(null);
    asyncMapStream(source, (end: any, data: any) => {
      if (end) {
        done(end);
      } else {
        expect(data).toBe('test');
        done();
      }
    });
  });
});