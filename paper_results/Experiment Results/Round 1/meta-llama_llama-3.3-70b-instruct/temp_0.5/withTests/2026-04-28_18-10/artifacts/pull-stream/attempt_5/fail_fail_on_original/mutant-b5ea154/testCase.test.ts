import { map } from '../throughs/map';

describe('map function', () => {
  it('should return the identity function if no mapper is provided', () => {
    const result = map();
    expect(result).toBeInstanceOf(Function);
  });

  it('should call the mapper function if provided', () => {
    const mapper = jest.fn();
    const result = map(mapper);
    expect(result).toBeInstanceOf(Function);
    const read = result((abort: any, cb: any) => {
      cb(null, 1);
    });
    read(null, (end: any, data: any) => {
      expect(mapper).toHaveBeenCalledTimes(1);
    });
  });

  it('should throw an error if the mutation is present', () => {
    // Simulate the mutation
    const originalMap = map;
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
        // This should throw an error
      });
    }).toThrowError();
  });
});