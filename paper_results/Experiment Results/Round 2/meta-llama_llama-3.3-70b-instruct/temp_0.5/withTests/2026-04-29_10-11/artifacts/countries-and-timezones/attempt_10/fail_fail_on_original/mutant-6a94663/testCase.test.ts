import index from '../index';

describe('countries-and-timezones', () => {
  it('should have exported functions', () => {
    expect(Object.keys(index)).not.toHaveLength(0);
  });
});