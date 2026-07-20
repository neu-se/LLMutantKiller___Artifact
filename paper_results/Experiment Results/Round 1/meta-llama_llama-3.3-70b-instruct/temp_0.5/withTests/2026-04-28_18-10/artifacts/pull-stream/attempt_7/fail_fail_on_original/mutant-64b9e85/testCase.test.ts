describe('find function', () => {
  it('should call callback with null error when no error occurs and the test function returns true', () => {
    const test = (data: any) => data === 1;
    const cb = jest.fn();
    const values = [1, 2, 3];
    const read = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/find').default;
    const findStream = read(test, cb);
    findStream(null, (end: any, data: any) => {
      if (end) return;
      if (data === 1) {
        expect(cb).toHaveBeenCalledTimes(1);
        expect(cb).toHaveBeenCalledWith(null, data);
      } else {
        findStream(null, (end: any, data: any) => {
          if (end) return;
          if (data === 1) {
            expect(cb).toHaveBeenCalledTimes(1);
            expect(cb).toHaveBeenCalledWith(null, data);
          }
        });
      }
    });
    findStream(null, (end: any, data: any) => {
      if (end) return;
      if (data === 1) {
        expect(cb).toHaveBeenCalledTimes(1);
        expect(cb).toHaveBeenCalledWith(null, data);
      }
    });
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('should call callback with error when error occurs', () => {
    const test = (data: any) => data === 1;
    const cb = jest.fn();
    const err = new Error('test error');
    const read = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/find').default;
    const findStream = read(test, cb);
    findStream(err, (end: any, data: any) => {
      expect(cb).toHaveBeenCalledTimes(1);
      expect(cb).toHaveBeenCalledWith(err === true? null : err, null);
    });
  });

  it('should call callback with null error when false is passed as error', () => {
    const test = (data: any) => data === 1;
    const cb = jest.fn();
    const read = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/find').default;
    const findStream = read(test, cb);
    findStream(false, (end: any, data: any) => {
      expect(cb).toHaveBeenCalledTimes(1);
      expect(cb).toHaveBeenCalledWith(null, data);
    });
  });
});