describe('find function', () => {
  it('should call callback with null error when no error occurs and the test function returns true', () => {
    const test = jest.fn((data: any) => data === 1);
    const cb = jest.fn();
    const values = [1, 2, 3];
    const findStream = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/find');
    findStream.default(test, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, 1);
  });

  it('should call callback with error when error occurs', () => {
    const test = jest.fn((data: any) => data === 1);
    const cb = jest.fn();
    const err = new Error('test error');
    const findStream = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/find');
    findStream.default(test, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, 1);
  });

  it('should call callback with null error when false is passed as error', () => {
    const test = jest.fn((data: any) => data === 1);
    const cb = jest.fn();
    const findStream = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/find');
    findStream.default(test, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, 1);
  });
});