import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transformPosition', () => {
  it('should correctly transform position when inserting text and offset is less than index', () => {
    const delta = new Delta().insert('A').retain(1);
    expect(delta.transformPosition(1)).toEqual(2);
  });
});