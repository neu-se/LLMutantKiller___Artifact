import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should correctly handle rules array initialization', () => {
    const rules = Object.getOwnPropertyDescriptor(plural, 'rules');
    expect(rules).toBeDefined();
    expect(rules.value).toBeInstanceOf(Array);
    expect(rules.value.length).toBeGreaterThan(0);
    expect(rules.value[0]).toBeInstanceOf(Array);
    expect(typeof rules.value[0][0]).toBe('object');
  });
});