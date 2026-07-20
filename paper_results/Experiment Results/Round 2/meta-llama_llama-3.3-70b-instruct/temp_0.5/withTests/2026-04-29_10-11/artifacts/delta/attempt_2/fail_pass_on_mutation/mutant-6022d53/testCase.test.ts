import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transformPosition', () => {
  it('should correctly transform position when inserting text at the beginning', () => {
    const delta = new Delta().insert('A');
    expect(delta.transformPosition(0)).toEqual(1);
  });

  it('should correctly transform position when inserting text in the middle with priority', () => {
    const delta = new Delta().retain(2).insert('B');
    expect(delta.transformPosition(2, true)).toEqual(2);
  });

  it.skip('should correctly transform position when deleting text before the position', () => {
    const delta = new Delta().delete(1).insert('B');
    expect(delta.transformPosition(1)).toEqual(0);
  });
});