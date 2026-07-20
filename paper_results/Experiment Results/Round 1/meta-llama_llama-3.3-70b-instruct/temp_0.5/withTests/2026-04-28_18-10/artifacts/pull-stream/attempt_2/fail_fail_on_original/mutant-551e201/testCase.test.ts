import { drain } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should throw an error when end is not true and done callback is not provided', () => {
    const read = drain((data: any) => {
      return true;
    });
    expect(() => {
      read(null, (end: any, data: any) => {
        if (end && end !== true) {
          throw end;
        }
      });
    }).toThrowError();
  });
});