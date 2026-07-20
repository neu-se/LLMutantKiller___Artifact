import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transformPosition', () => {
  it('should correctly transform position when inserting text at the end', () => {
    const delta = new Delta().insert('A').retain(2).insert('B');
    expect(delta.transformPosition(3)).toEqual(5);
  });

  it.skip('should correctly transform position when inserting text in the middle', () => {
    const delta = new Delta().insert('A').retain(2).insert('B');
    expect(delta.transformPosition(1)).toEqual(1);
  });

  it.skip('should correctly transform position when deleting text before the position', () => {
    const delta = new Delta().retain(2).delete(1).insert('B');
    expect(delta.transformPosition(3)).toEqual(2);
  });

  it.skip('should correctly transform position when deleting text at the position', () => {
    const delta = new Delta().retain(2).delete(1).insert('B');
    expect(delta.transformPosition(2)).toEqual(1);
  });

  it('should correctly transform position when deleting text after the position', () => {
    const delta = new Delta().retain(2).delete(1).insert('B');
    expect(delta.transformPosition(1)).toEqual(1);
  });
});