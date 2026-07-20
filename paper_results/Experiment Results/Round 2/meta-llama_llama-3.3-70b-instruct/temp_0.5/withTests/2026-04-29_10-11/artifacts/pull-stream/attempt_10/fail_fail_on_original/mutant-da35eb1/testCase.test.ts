import find from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js';
import values from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';

describe('find', () => {
  it('should call callback with null error and found value when test function returns true', (done) => {
    const testFunction = (data: any) => data === 7;
    const callback = jest.fn();

    const read = values([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    read(null, (end, data) => {
      if (end) return done();
      read(null, (end, data) => {
        if (end) return done();
        const findStream = find(testFunction, callback);
        findStream(read);
        findStream(null, (end, data) => {
          if (end) return done();
          expect(callback).toHaveBeenCalledTimes(1);
          expect(callback).toHaveBeenCalledWith(null, 7);
          done();
        });
      });
    });
  });
});