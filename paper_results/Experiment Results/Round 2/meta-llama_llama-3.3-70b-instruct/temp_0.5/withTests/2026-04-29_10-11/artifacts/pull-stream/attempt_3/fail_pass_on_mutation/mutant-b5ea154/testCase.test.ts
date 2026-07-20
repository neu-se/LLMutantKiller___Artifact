import map from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/map.js";

describe('map', () => {
  it('should return identity function when mapper is null or undefined', () => {
    const originalMapper = map(null);
    expect(typeof originalMapper).toBe('function');
  });
});