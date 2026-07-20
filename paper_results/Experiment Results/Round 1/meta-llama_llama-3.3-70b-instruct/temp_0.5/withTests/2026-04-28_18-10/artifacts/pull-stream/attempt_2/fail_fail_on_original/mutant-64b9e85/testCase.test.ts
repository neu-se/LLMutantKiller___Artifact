import { find } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/find';

describe('find function', () => {
  it('should call callback with null error when no error occurs', () => {
    const test = jest.fn((data) => true);
    const cb = jest.fn();
    find(test, cb);
    cb(null, 'test data');
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, 'test data');
  });

  it('should call callback with error when error occurs', () => {
    const test = jest.fn((data) => true);
    const cb = jest.fn();
    find(test, cb);
    cb(new Error('test error'), null);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(new Error('test error'), null);
  });

  it('should call callback with null error when no error occurs and false is passed as error', () => {
    const test = jest.fn((data) => true);
    const cb = jest.fn();
    find(test, cb);
    cb(false, 'test data');
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, 'test data');
  });
});