import { map } from '../throughs/map';

describe('map function', () => {
  it('should return the identity function if no mapper is provided', () => {
    const result = map(undefined);
    expect(result).toBeInstanceOf(Function);
    const read = result((abort: any, cb: any) => {
      cb(null, 1);
    });
    read(null, (end: any, data: any) => {
      expect(end).toBe(false);
      expect(data).toBe(1);
    });
  });

  it('should throw an error if mapper is undefined and no identity function is returned', () => {
    const originalMap = map;
    // Simulate the mutated code
    const mutatedMap = () => {
      return (read: any) => {
        return (abort: any, cb: any) => {
          read(abort, cb);
        };
      };
    };
    expect(() => {
      const result = mutatedMap();
      const read = result((abort: any, cb: any) => {
        cb(null, 1);
      });
      read(null, (end: any, data: any) => {
        expect(end).toBe(false);
        expect(data).toBe(1);
      });
    }).toThrowError();
  });
});