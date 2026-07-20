import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transformPosition()', () => {
  it('should correctly transform position when insert operation is applied after delete operation and offset is less than index', () => {
    const delta = new Delta().delete(1).insert('A');
    expect(delta.transformPosition(0)).toEqual(1);
  });
});