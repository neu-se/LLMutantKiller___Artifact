import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transformPosition()', () => {
  it('should correctly transform position when delete operation is applied and insert operation is applied after the position', () => {
    const delta = new Delta().retain(2).insert('A').delete(2);
    expect(delta.transformPosition(4)).toEqual(3);
  });
});