import { asyncMap } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe('asyncMap', () => {
  it('should pass the input to the next function when no map function is provided', (done) => {
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