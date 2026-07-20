import { map } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/map.js";

describe('map function', () => {
  it('should return the identity function when mapper is falsy', () => {
    const mapper = null;
    const result = map(mapper);
    expect(result).toBeInstanceOf(Function);
    const read = (abort: any, cb: any) => {
      cb(false, 'test');
    };
    const cb = (end: boolean, data: any) => {
      expect(end).toBe(false);
      expect(data).toBe('test');
    };
    result(read)(null, cb);
  });
});