import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transformPosition()', () => {
  it('should correctly transform position when insert operation is applied and offset is less than index', () => {
    const delta = new Delta().insert('A');
    expect(delta.transformPosition(0, false)).toEqual(1);
  });
});