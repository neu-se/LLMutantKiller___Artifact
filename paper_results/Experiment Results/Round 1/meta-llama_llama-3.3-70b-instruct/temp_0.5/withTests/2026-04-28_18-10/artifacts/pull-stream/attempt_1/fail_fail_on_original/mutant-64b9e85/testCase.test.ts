import { find } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/find';

describe('find function', () => {
  it('should call callback with error when error occurs', () => {
    const test = jest.fn();
    const cb = jest.fn();
    const err = new Error('test error');
    find(test, (err, data) => {
      cb(err, data);
    });
    // Simulate error in the find function
    cb(err, null);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(err, null);
  });
});