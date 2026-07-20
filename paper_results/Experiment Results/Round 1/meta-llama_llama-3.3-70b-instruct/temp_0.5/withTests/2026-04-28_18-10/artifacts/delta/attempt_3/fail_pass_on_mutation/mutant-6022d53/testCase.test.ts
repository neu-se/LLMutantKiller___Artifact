import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transformPosition()', () => {
  it('should correctly transform position when insert operation is applied after the position and offset is less than index', () => {
    const delta = new Delta().retain(2).insert('A');
    expect(delta.transformPosition(3)).toEqual(4);
  });
});