import { find } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js';

describe('find', () => {
  it('should call callback with null error and found value when test function returns true', () => {
    const testFunction = (data: any) => data === 7;
    const callback = jest.fn();
    const read = find(testFunction, callback);

    read(null, (end: any, data: any) => {
      if (end) return;
      if (data === 7) {
        read(true, () => {});
      }
    });

    read(null, (end: any, data: any) => {
      if (end) return;
      if (data === 7) {
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(null, 7);
      }
    });

    read(null, (end: any, data: any) => {
      if (end) return;
      if (data === 7) {
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(null, 7);
      }
    });
  });
});