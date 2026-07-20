import find from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js';
import values from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';
import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('find', () => {
  it('should call callback with null error and found value when test function returns true', (done) => {
    const testFunction = (data: any) => data === 7;
    const callback = jest.fn();

    values([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
      find(testFunction, (err: any, data: any) => {
        if (err) {
          done(err);
        } else {
          expect(data).toBe(7);
          done();
        }
      })
    );
  });
});