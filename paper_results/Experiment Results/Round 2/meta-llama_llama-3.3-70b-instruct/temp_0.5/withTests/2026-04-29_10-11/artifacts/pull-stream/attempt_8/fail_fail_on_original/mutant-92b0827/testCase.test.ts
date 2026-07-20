import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce', () => {
  it('should handle ended stream with no initial value', () => {
    const source = () => {
      return function (end: boolean, cb: (end: boolean, data?: any) => void) {
        if (end) return cb(end === true ? null : end);
      };
    };

    const reducer = (acc: any, data: any) => acc;

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