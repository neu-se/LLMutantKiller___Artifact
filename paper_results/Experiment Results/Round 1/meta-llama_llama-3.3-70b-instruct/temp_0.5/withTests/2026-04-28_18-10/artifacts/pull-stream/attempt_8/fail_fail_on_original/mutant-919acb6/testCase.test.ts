import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream/index.js';

describe('drain', () => {
  it('should call done with null when end is true', () => {
    const done = jest.fn();
    const sink = pull.drain((data: any) => {
      return true;
    }, done);
    sink(null, (end: any, data: any) => {
      if (end === true) {
        expect(done).toHaveBeenCalledTimes(1);
        expect(done).toHaveBeenCalledWith(null);
      }
    });
    sink(true, () => {});
  });

  it('should call done with error when end is not true and not false', () => {
    const done = jest.fn();
    const sink = pull.drain((data: any) => {
      return true;
    }, done);
    sink(null, (end: any, data: any) => {
      if (end!== true && end!== false) {
        expect(done).toHaveBeenCalledTimes(1);
        expect(done).toHaveBeenCalledWith(end);
      }
    });
    sink(new Error('test error'), () => {});
  });
});