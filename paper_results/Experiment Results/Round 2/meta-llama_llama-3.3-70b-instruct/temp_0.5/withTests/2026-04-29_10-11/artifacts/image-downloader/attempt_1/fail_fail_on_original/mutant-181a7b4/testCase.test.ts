import { TimeoutError } from '../../../../../lib/TimeoutError';

describe('TimeoutError', () => {
  it('should have a meaningful error message', () => {
    const error = new TimeoutError();
    expect(error.message).toBe('TimeoutError');
  });
});