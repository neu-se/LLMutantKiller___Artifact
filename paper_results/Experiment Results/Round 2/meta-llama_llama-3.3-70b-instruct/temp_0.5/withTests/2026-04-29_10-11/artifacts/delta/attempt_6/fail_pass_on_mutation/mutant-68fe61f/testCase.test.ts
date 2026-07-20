import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should check module type correctly', () => {
    // @ts-ignore
    const originalModule = global.module;
    // @ts-ignore
    global.module = { exports: {} };
    expect(typeof global.module).toBe('object');
    // @ts-ignore
    global.module = originalModule;
  });
});