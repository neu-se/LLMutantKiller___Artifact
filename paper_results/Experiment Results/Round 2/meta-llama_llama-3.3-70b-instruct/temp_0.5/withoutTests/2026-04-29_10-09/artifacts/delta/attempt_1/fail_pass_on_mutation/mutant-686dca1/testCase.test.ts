import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should export correctly', () => {
    expect(typeof Delta).toBe('function');
    expect(Delta.prototype).toHaveProperty('insert');
    expect(Delta.prototype).toHaveProperty('delete');
    expect(Delta.prototype).toHaveProperty('retain');
    expect(Delta.prototype).toHaveProperty('push');
    expect(Delta.prototype).toHaveProperty('chop');
    expect(Delta.prototype).toHaveProperty('filter');
    expect(Delta.prototype).toHaveProperty('forEach');
    expect(Delta.prototype).toHaveProperty('map');
    expect(Delta.prototype).toHaveProperty('partition');
    expect(Delta.prototype).toHaveProperty('reduce');
    expect(Delta.prototype).toHaveProperty('changeLength');
    expect(Delta.prototype).toHaveProperty('length');
    expect(Delta.prototype).toHaveProperty('slice');
    expect(Delta.prototype).toHaveProperty('compose');
    expect(Delta.prototype).toHaveProperty('concat');
    expect(Delta.prototype).toHaveProperty('diff');
    expect(Delta.prototype).toHaveProperty('eachLine');
    expect(Delta.prototype).toHaveProperty('invert');
    expect(Delta.prototype).toHaveProperty('transform');
    expect(Delta.prototype).toHaveProperty('transformPosition');
  });
});