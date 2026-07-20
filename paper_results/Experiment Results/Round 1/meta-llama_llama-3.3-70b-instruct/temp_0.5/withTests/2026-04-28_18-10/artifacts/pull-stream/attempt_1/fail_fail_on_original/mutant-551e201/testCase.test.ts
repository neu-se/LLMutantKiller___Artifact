import { drain } from '../../../sinks/drain.js';

describe('drain', () => {
  it('should throw an error when end is not true and done callback is not provided', () => {
    const read = drain((data) => {
      return true;
    });
    expect(() => {
      read(null, (end, data) => {
        if (end && end!== true) {
          throw end;
        }
      });
    }).toThrowError();
  });
});