import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should transform correctly when there are deletes', () => {
    const delta1 = new Delta().retain(5).delete(3);
    const delta2 = new Delta().delete(5);
    const transformed = delta1.transform(delta2);
    expect(transformed.ops[0].delete).toBeLessThan(5);
  });
});