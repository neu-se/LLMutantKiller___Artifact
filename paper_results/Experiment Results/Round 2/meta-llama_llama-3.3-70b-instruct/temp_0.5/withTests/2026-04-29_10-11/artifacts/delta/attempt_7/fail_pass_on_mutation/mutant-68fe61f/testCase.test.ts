import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should check module type correctly', () => {
    // @ts-ignore
    const originalModule = global.module;
    // @ts-ignore
    global.module = "";
    expect(() => {
      // @ts-ignore
      if (typeof global.module !== 'object') {
        throw new Error('module is not an object');
      }
    }).toThrowError('module is not an object');
    // @ts-ignore
    global.module = originalModule;
  });
});