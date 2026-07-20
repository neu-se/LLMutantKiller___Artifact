import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transformPosition()', () => {
  it('should correctly transform position when insert operation is applied after position and priority is false', () => {
    const delta = new Delta().retain(2).insert('A');
    expect(delta.transformPosition(2, false)).toEqual(3);
  });
});