import { find } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/find';

describe('find function', () => {
  it('should call callback with null error when no error occurs and the test function returns true', () => {
    const test = (data: any) => data === 1;
    const cb = jest.fn();
    const read = find(test, cb);
    read(null, (end: any, data: any) => {
      if (end) return;
      if (data === 1) {
        expect(cb).toHaveBeenCalledTimes(1);
        expect(cb).toHaveBeenCalledWith(null, data);
      } else {
        read(null, (end: any, data: any) => {
          if (end) return;
          if (data === 1) {
            expect(cb).toHaveBeenCalledTimes(1);
            expect(cb).toHaveBeenCalledWith(null, data);
          }
        });
      }
    });
    read(null, (end: any, data: any) => {
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
    const read = find(test, cb);
    const err = new Error('test error');
    read(err, (end: any, data: any) => {
      expect(cb).toHaveBeenCalledTimes(1);
      expect(cb).toHaveBeenCalledWith(null, null);
    });
  });

  it('should call callback with null error when false is passed as error', () => {
    const test = (data: any) => data === 1;
    const cb = jest.fn();
    const read = find(test, cb);
    read(false, (end: any, data: any) => {
      expect(cb).toHaveBeenCalledTimes(1);
      expect(cb).toHaveBeenCalledWith(null, data);
    });
  });
});