import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transformPosition()', () => {
  it('should correctly transform position when insert operation is applied after delete operation', () => {
    const delta = new Delta().delete(1).insert('A');
    expect(delta.transformPosition(1)).toEqual(1);
  });
});