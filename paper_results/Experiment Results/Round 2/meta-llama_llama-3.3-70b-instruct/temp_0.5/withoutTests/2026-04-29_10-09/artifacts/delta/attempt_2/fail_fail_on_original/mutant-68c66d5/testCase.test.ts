import { Delta } from '../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should export Delta as default and named export', () => {
    expect(Delta).toBeDefined();
    expect(typeof Delta).toBe('function');
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);
    expect(module.exports).toBeDefined();
    expect(module.exports.default).toBeDefined();
    expect(module.exports.default).toBe(Delta);
  });
});