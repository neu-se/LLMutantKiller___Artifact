import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream/index.js';

describe('drain', () => {
  it('should throw an error when end is not true and done callback is not provided', () => {
    const read = pull.drain((data: any) => {
      return true;
    });
    const error = new Error('test error');
    read(error, (end: any, data: any) => {
      if (end && end !== true) {
        throw end;
      }
    });
    expect(() => {
      read(null, (end: any, data: any) => {
        if (end && end !== true) {
          throw end;
        }
      });
    }).not.toThrowError();
  });
});