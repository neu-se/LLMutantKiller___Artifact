import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe('asyncMap', () => {
  it('should return the input when no map function is provided and the input is passed to the returned function', (done) => {
    const read = (abort: any, cb: (err: any, data: any) => void) => {
      cb(null, 'test');
    };

    const next = asyncMap(null)(read);
    next(null, (err: any, data: any) => {
      expect(data).toBe('test');
      done();
    });
  });
});