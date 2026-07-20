import { drain } from '../../../sinks/drain.js';

describe('drain function', () => {
  it('should throw an error when end is not true and no done callback is supplied', () => {
    const read = jest.fn((err, cb) => {
      cb(true, 'error');
    });
    const sink = drain(null, null);
    expect(() => {
      sink(read);
    }).toThrowError('no done callback supplied');
  });
});