import { find } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js';
import { values } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';

describe('find', () => {
  it('should call callback with null error and found value when test function returns true', () => {
    const testFunction = (data: any) => data === 7;
    const callback = jest.fn();
    const valuesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    find(testFunction, (err: any, data: any) => {
      if (err) {
        expect(err).toBeNull();
      } else {
        expect(data).toBe(7);
      }
    })(null, (end: any, data: any) => {
      if (end) return;
      if (data === undefined) return;
      callback(data);
      if (data === 7) {
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(7);
      }
    })(null, (end: any, data: any) => {
      if (end) return;
      if (data === undefined) return;
      callback(data);
      if (data === 7) {
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(7);
      }
    });
    valuesArray.forEach((value) => {
      find(testFunction, (err: any, data: any) => {
        if (err) {
          expect(err).toBeNull();
        } else {
          expect(data).toBe(7);
        }
      })(null, (end: any, data: any) => {
        if (end) return;
        if (data === undefined) return;
        callback(data);
        if (data === 7) {
          expect(callback).toHaveBeenCalledTimes(1);
          expect(callback).toHaveBeenCalledWith(7);
        }
      })(null, (end: any, data: any) => {
        if (end) return;
        if (data === undefined) return;
        callback(data);
        if (data === 7) {
          expect(callback).toHaveBeenCalledTimes(1);
          expect(callback).toHaveBeenCalledWith(7);
        }
      });
    });
  });
});