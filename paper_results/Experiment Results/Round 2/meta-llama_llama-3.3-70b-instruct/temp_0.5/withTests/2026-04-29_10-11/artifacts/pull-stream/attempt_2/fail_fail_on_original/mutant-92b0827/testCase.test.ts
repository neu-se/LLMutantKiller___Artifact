import { reduce } from '../../../sinks/reduce';

describe('reduce', () => {
  it('should handle ended stream with no initial value', () => {
    const source = () => {
      return function (end: boolean, cb: (end: boolean, data?: any) => void) {
        cb(true);
      };
    };

    const reducer = (acc: any, data: any) => {
      throw new Error('should not be called');
    };

    const cb = jest.fn();

    const sink = reduce(reducer, cb);

    const read = sink(source());

    read(null, (end: boolean, data: any) => {
      expect(end).toBe(true);
      expect(data).toBeUndefined();
      expect(cb).toHaveBeenCalledTimes(1);
      expect(cb).toHaveBeenCalledWith(null, undefined);
    });
  });
});