import { Delta } from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should compose correctly when thisIter.peekType() is "insert" and thisIter.peekLength() is less than or equal to firstLeft', () => {
    const delta1 = new Delta().insert('Hello, ');
    const delta2 = new Delta().insert('world!');
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops).toEqual([
      { insert: 'Hello, ' },
      { insert: 'world!' },
    ]);
  });
});