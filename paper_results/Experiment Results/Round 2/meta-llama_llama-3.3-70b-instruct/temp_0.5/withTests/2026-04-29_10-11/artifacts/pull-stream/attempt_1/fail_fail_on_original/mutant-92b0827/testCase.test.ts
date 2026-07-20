import { reduce } from '../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js';

describe('reduce', () => {
  it('should handle ended stream with no initial value', () => {
    const source = () => {
      return function (end, cb) {
        cb(true);
      };
    };

    const reducer = (acc, data) => {
      throw new Error('should not be called');
    };

    const cb = jest.fn();

    const sink = reduce(reducer, cb);

    const read = sink(source());

    read(null, (end, data) => {
      expect(end).toBe(true);
      expect(data).toBeUndefined();
      expect(cb).toHaveBeenCalledTimes(1);
      expect(cb).toHaveBeenCalledWith(null, undefined);
    });
  });
});