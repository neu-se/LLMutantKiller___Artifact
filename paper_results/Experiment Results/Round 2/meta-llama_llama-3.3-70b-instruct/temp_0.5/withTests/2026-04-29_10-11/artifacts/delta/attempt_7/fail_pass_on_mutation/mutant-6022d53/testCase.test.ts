import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transformPosition', () => {
  it('should correctly transform position when inserting text after a retain operation', () => {
    const delta = new Delta().retain(2).insert('A');
    expect(delta.transformPosition(2)).toEqual(3);
  });
});