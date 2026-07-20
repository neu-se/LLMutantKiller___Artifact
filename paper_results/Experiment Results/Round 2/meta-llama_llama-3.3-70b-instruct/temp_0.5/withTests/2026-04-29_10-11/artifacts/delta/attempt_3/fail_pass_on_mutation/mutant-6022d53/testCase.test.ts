import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transformPosition', () => {
  it('should correctly transform position when inserting text at the beginning and offset is less than index', () => {
    const delta = new Delta().insert('A');
    expect(delta.transformPosition(0)).toEqual(1);
  });

  it('should correctly transform position when inserting text in the middle and offset is equal to index', () => {
    const delta = new Delta().retain(2).insert('B');
    expect(delta.transformPosition(2, true)).toEqual(2);
  });

  it('should correctly transform position when inserting text in the middle and offset is greater than index', () => {
    const delta = new Delta().retain(2).insert('B');
    expect(delta.transformPosition(3)).toEqual(4);
  });
});