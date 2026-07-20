import map from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/map.js";

describe('map', () => {
  it('should return identity function when mapper is null or undefined', () => {
    const originalMapper = map(null);
    expect(originalMapper).not.toBeNull();
    expect(typeof originalMapper).toBe('function');
    const read = (abort: any, cb: any) => {
      cb(null, 5);
    };
    const result = originalMapper(read);
    expect(typeof result).toBe('function');
    result(null, (end: any, data: any) => {
      expect(end).toBeNull();
      expect(data).toBe(5);
    });
  });
});