import map from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/map.js";

describe('map function', () => {
  it('should use identity function when mapper is not provided', (done) => {
    const mockRead = jest.fn((abort, cb) => {
      cb(null, 42);
    });

    const mappedRead = map(undefined);
    mappedRead(mockRead)(null, (end, data) => {
      expect(data).toBe(42);
      done();
    });
  });
});