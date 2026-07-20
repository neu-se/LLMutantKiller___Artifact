import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce function', () => {
  it('should handle end event correctly', () => {
    const reducer = (acc: any, data: any) => acc + data;
    const cb = jest.fn();
    const source = (end: any, cb: any) => {
      cb(null, 1);
    };

    reduce(reducer, cb, source);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, 1);
  });
});