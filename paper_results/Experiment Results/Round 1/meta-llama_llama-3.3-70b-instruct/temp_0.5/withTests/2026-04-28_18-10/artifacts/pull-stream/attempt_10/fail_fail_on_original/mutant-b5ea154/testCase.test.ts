import { map } from '../throughs/map.js';

describe('map function', () => {
  it('should return the identity function when no mapper is provided', () => {
    const result = map();
    expect(result).toBeInstanceOf(Function);
    const read = (abort: any, cb: any) => {
      cb(null, 1);
    };
    const newRead = result(read);
    expect(newRead).toBeInstanceOf(Function);
    newRead(null, (end: any, data: any) => {
      expect(data).toBe(1);
    });
  });

  it('should throw an error when the mutation is present and no mapper is provided', () => {
    const originalMap = map;
    const mutatedMap = () => {
      return (read: any) => {
        return (abort: any, cb: any) => {
          read(abort, cb);
        };
      };
    };
    const result = mutatedMap();
    expect(result).toBeInstanceOf(Function);
    const read = (abort: any, cb: any) => {
      cb(null, 1);
    };
    const newRead = result(read);
    expect(newRead).toBeInstanceOf(Function);
    expect(() => {
      newRead(null, (end: any, data: any) => {
        expect(data).toBe(1);
      });
    }).toThrowError();
  });
});