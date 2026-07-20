import { map } from '../../../throughs/map.js';

describe('map function', () => {
  it('should return a function that maps data correctly when a mapper is provided', () => {
    const mapper = (data: any) => data * 2;
    const result = map(mapper);
    expect(result).toBeInstanceOf(Function);
    const read = (abort: any, cb: any) => {
      cb(null, 1);
    };
    const newRead = result(read);
    expect(newRead).toBeInstanceOf(Function);
    newRead(null, (end: any, data: any) => {
      expect(data).toBe(2);
    });
  });

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
});