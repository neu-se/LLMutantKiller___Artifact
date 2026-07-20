import { asyncMap } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe('asyncMap', () => {
  it('should return the identity function when no map function is provided', () => {
    const result = asyncMap(null);
    expect(typeof result).toBe('function');
    const read = (abort: any, cb: (err: any, data: any) => void) => {
      cb(null, 'test');
    };
    const next = result(read);
    let called = false;
    next(null, (err: any, data: any) => {
      called = true;
      expect(data).toBe('test');
    });
    expect(called).toBe(false); // The callback should not be called immediately
  });
});