import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transformPosition', () => {
  it('should correctly transform position when offset equals index and next operation is insert with priority false', () => {
    const delta = new Delta().retain(1).insert('A');
    expect(delta.transformPosition(1, false)).toEqual(2);
  });
});