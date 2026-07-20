import { reduce } from "../../../../sinks/reduce.js";

describe('reduce', () => {
  it('should handle ended stream with no initial value', () => {
    const source = () => {
      return function (end: boolean, cb: (end: boolean, data?: any) => void) {
        if (end) return cb(end);
        cb(null, 'data');
      };
    };

    const reducer = (acc: any, data: any) => acc;

    const cb = jest.fn();

    const sink = reduce(reducer, cb);

    const read = sink(source());

    read(true, (end: boolean, data: any) => {
      expect(end).toBe(true);
      expect(data).toBeUndefined();
      expect(cb).toHaveBeenCalledTimes(1);
      expect(cb).toHaveBeenCalledWith(true, undefined);
    });
  });
});