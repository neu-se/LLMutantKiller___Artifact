import { map } from '../throughs/map';

describe('map function', () => {
  it('should return the identity function if no mapper is provided and pass through data unchanged', () => {
    const mapper = undefined;
    const result = map(mapper);
    expect(result).toBeInstanceOf(Function);
    const read = result((abort, cb) => {
      cb(null, 1);
    });
    read(null, (end, data) => {
      expect(end).toBe(false);
      expect(data).toBe(1);
    });
  });
});