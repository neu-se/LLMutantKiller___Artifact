import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transformPosition()', () => {
  it('should correctly transform position when delete operation is applied', () => {
    const delta = new Delta().delete(2);
    expect(delta.transformPosition(4)).toEqual(2);
  });

  it('should correctly transform position when insert operation is applied before the position', () => {
    const delta = new Delta().insert('A');
    expect(delta.transformPosition(2)).toEqual(3);
  });

  it('should correctly transform position when insert operation is applied after the position', () => {
    const delta = new Delta().retain(2).insert('A');
    expect(delta.transformPosition(1)).toEqual(1);
  });

  it('should correctly transform position when insert operation is applied at the position', () => {
    const delta = new Delta().retain(2).insert('A');
    expect(delta.transformPosition(2, true)).toEqual(2);
    expect(delta.transformPosition(2, false)).toEqual(3);
  });
});