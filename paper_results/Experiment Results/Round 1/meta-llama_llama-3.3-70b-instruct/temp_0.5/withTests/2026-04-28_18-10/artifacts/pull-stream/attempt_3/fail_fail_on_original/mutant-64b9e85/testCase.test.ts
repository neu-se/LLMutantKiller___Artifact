import { find } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/find';

describe('find function', () => {
  it('should call callback with null error when no error occurs and the test function returns true', () => {
    const test = jest.fn((data) => true);
    const cb = jest.fn();
    const values = [1, 2, 3];
    const read = find(test, cb);
    read(null, (end, data) => {
      if (!end) {
        read(null, (end, data) => {
          if (!end) {
            read(null, (end, data) => {
              if (!end) {
                expect(cb).toHaveBeenCalledTimes(1);
                expect(cb).toHaveBeenCalledWith(null, data);
              }
            });
          }
        });
      }
    });
  });

  it('should call callback with an error when the test function returns true and an error occurs', () => {
    const test = jest.fn((data) => true);
    const cb = jest.fn();
    const values = [1, 2, 3];
    const read = find(test, cb);
    const err = new Error('test error');
    read(null, (end, data) => {
      if (!end) {
        read(null, (end, data) => {
          if (!end) {
            read(err, (end, data) => {
              expect(cb).toHaveBeenCalledTimes(1);
              expect(cb).toHaveBeenCalledWith(err, null);
            });
          }
        });
      }
    });
  });

  it('should call callback with null error when no error occurs and the test function returns true and false is passed as error', () => {
    const test = jest.fn((data) => true);
    const cb = jest.fn();
    const values = [1, 2, 3];
    const read = find(test, cb);
    read(null, (end, data) => {
      if (!end) {
        read(null, (end, data) => {
          if (!end) {
            read(false, (end, data) => {
              expect(cb).toHaveBeenCalledTimes(1);
              expect(cb).toHaveBeenCalledWith(null, data);
            });
          }
        });
      }
    });
  });
});