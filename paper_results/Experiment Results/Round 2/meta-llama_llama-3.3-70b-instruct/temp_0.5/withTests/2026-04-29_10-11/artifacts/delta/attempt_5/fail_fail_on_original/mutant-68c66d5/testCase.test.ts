import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should export the Delta class and its methods', () => {
    const delta = new Delta();
    expect(delta).toBeDefined();
    expect(typeof delta).toBe('object');
    expect(delta.constructor.name).toBe('Delta');
    expect(typeof Delta.registerEmbed).toBe('function');
    expect(typeof Delta.unregisterEmbed).toBe('function');
    expect(typeof module.exports).toBe('object');
    expect(module.exports.default).toBe(Delta);
  });
});