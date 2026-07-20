import { reduce } from "../../../sinks/reduce.js";

describe('reduce', () => {
  it('should handle ended stream with no initial value', () => {
    const source = () => {
      return function (end: boolean, cb: (end: boolean, data?: any) => void) {
        cb(true, null);
      };
    };

    const reducer = (acc: any, data: any) => acc;

    const cb = jest.fn();

    const sink = reduce(reducer, null, cb);

    const read = sink(source());

    read(null, (end: boolean, data: any) => {
      expect(end).toBe(true);
      expect(data).toBe(null);
      expect(cb).toHaveBeenCalledTimes(1);
      expect(cb).toHaveBeenCalledWith(null, null);
    });
  });
});