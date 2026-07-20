// test/delta/module-export.test.ts

import Delta from '../src/Delta';

describe('Delta module export', () => {
  it('should export Delta as default', () => {
    expect(Delta).toBeDefined();
    expect(typeof Delta).toBe('function');
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);
  });
});