import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose with a retain operation and an insert operation', () => {
    const delta1 = new Delta();
    delta1.retain(5);

    const delta2 = new Delta();
    delta2.retain(3);
    delta2.insert('Hello, ');

    const composedDelta = delta1.compose(delta2);
    let foundInsert = false;
    let foundRetain = false;
    for (const op of composedDelta.ops) {
      if (op.insert) {
        foundInsert = true;
      }
      if (op.retain) {
        foundRetain = true;
      }
    }
    expect(foundInsert).toBe(true);
    expect(foundRetain).toBe(true);
  });
});