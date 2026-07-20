import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('push()', () => {
  it('should append operation when index equals ops length', () => {
    const delta = new Delta();
    delta.push({ insert: 'test' });
    expect(delta.ops).toEqual([{ insert: 'test' }]);
  });
});