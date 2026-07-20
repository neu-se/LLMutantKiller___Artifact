import { find } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js';

describe('find', () => {
  it('should call callback with null error and found value when test function returns true', () => {
    const testFunction = (data: any) => data === 7;
    const callback = jest.fn();
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const read = find(testFunction, callback);
    values.forEach((value) => {
      read(null, (end: any, data: any) => {
        if (end) return;
        if (data === 7) {
          expect(callback).toHaveBeenCalledTimes(1);
          expect(callback).toHaveBeenCalledWith(null, 7);
        }
      });
    });
  });

  it('should call callback with error when test function returns true and error is not null', () => {
    const testFunction = (data: any) => data === 7;
    const callback = jest.fn();
    const error = new Error('Test error');
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const read = find(testFunction, callback);
    values.forEach((value) => {
      read(null, (end: any, data: any) => {
        if (end) return;
        if (data === 7) {
          expect(callback).toHaveBeenCalledTimes(1);
          expect(callback).toHaveBeenCalledWith(null, 7);
        }
      });
    });
  });
});