import map from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/map.js";

describe('map', () => {
  it('should return the identity function when mapper is not provided', () => {
    const identityMapper = map();
    const mockRead = jest.fn((abort, cb) => cb(null, 42));
    const mappedRead = identityMapper(mockRead);

    mappedRead(null, (end, data) => {
      expect(data).toBe(42);
    });
  });
});