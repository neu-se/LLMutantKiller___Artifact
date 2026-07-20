import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose with a retain operation and an insert operation', () => {
    const delta1 = new Delta();
    delta1.retain(5);

    const delta2 = new Delta();
    delta2.retain(3);
    delta2.insert('Hello, ');

    const composedDelta = delta1.compose(delta2);
    let retainCount = 0;
    let insertCount = 0;
    for (const op of composedDelta.ops) {
      if (op.retain) {
        retainCount++;
      }
      if (op.insert) {
        insertCount++;
      }
    }
    expect(retainCount).toBeGreaterThan(0);
    expect(insertCount).toBeGreaterThan(0);
    expect(composedDelta.ops.length).toBeGreaterThan(1);
  });
});