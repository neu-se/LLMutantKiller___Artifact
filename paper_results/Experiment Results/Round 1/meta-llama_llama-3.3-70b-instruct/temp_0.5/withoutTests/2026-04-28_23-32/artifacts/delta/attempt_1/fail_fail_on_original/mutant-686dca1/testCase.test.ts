import { Delta } from '../../../src/Delta';

describe('Delta', () => {
  it('should export Delta as default and module.exports', () => {
    expect(typeof Delta).toBe('function');
    expect(Delta.name).toBe('Delta');
    const deltaInstance = new Delta();
    expect(deltaInstance instanceof Delta).toBe(true);
  });
});