import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should handle error correctly', () => {
    const cb = jest.fn();
    const test = (data: any) => true;
    const err = new Error('Test error');
    const read = jest.fn((end: any, cb: any) => {
      cb(err);
    });
    find(test, cb);
    read(false, () => {});
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(err, null);
  });
});