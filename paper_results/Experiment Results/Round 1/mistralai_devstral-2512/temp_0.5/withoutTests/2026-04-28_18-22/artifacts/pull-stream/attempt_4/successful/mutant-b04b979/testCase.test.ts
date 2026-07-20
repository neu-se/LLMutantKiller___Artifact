const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe('asyncMap with null map function', () => {
  it('should return the identity function when map is null', () => {
    const transform = asyncMap(null);
    const mockRead = jest.fn((abort, cb) => {
      cb(null, 'test-data');
    });

    const result = transform(mockRead);
    expect(typeof result).toBe('function');

    // The identity function should pass through the read function
    const next = result(null, (end, data) => {
      expect(end).toBe(null);
      expect(data).toBe('test-data');
    });

    expect(mockRead).toHaveBeenCalled();
  });
});