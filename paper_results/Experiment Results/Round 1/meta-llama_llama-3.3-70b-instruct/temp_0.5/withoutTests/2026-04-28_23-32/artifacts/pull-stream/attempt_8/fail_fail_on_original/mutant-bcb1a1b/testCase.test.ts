import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce function', () => {
  it('should handle the case where only two arguments are provided', () => {
    const reducer = (acc: number, data: number) => acc + data;
    const cb = jest.fn();
    const source = (end: any, data: number) => {
      if (end) return;
      source(null, 5);
      source(true, null);
    };
    const fn = reduce(reducer, cb);
    expect(typeof fn).toBe('function');
    fn(source);
    expect(cb).toHaveBeenCalledTimes(1);
  });
});