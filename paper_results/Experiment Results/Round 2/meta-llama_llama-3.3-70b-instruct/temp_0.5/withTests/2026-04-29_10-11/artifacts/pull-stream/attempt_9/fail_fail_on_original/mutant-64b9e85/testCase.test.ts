import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should call the callback with the correct error when the stream ends with an error', () => {
    const cb = jest.fn();
    const test = (d: any) => d === 2;
    const source = (end: any, cb: any) => {
      if (end) return cb(end);
      cb(null, 2);
    };
    const read = find(test, cb);
    read(source, (end: any, data: any) => {
      if (end) return;
      expect(cb).toHaveBeenCalledTimes(1);
      expect(cb).toHaveBeenCalledWith(null, 2);
    });
  });
});