import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transformPosition', () => {
  it('should correctly transform position when offset is less than index and next operation is insert', () => {
    const delta = new Delta().insert('A').retain(1);
    expect(delta.transformPosition(0)).toEqual(1);
  });
});