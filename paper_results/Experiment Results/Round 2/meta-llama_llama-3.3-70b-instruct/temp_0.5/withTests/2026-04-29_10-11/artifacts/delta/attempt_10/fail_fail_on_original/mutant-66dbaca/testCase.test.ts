const Delta = require('../src/Delta');

describe('Delta', () => {
  it('should be exported correctly', () => {
    expect(Delta).toBeDefined();
    expect(Delta.default).toBeDefined();
    expect(Delta).toEqual({ default: Delta.default, ...Delta });
  });
});