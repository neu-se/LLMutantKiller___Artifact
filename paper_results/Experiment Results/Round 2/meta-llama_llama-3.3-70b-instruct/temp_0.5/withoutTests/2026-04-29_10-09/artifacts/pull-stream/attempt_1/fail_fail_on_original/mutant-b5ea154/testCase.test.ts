import { map } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/map.js";

describe('map function', () => {
  it('should return the identity function when mapper is falsy', () => {
    const mapper = null;
    const result = map(mapper);
    expect(result).toBeInstanceOf(Function);
    const identityResult = result(null)(null, (end, data) => {
      expect(end).toBe(false);
      expect(data).toBeNull();
    });
  });
});