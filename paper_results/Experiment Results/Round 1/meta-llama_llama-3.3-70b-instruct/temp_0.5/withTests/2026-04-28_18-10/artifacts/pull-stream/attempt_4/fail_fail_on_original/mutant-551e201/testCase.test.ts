import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream/index.js';

describe('drain', () => {
  it('should throw an error when end is not true and done callback is not provided', () => {
    const source = pull.values([1, 2, 3, new Error('test error')]);
    const read = pull(
      source,
      pull.drain(null)
    );
    expect(() => {
      read(null, (end: any, data: any) => {
        if (end && end!== true) {
          throw end;
        }
      });
    }).toThrowError();
  });
});