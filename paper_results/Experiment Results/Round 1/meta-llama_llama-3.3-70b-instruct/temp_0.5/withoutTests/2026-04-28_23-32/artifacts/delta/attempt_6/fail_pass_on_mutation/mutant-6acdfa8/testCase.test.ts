import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should not retain attributes when they are empty', () => {
    const delta = new Delta();
    const attributes: any = {};
    delta.retain(1, attributes);
    const op = delta.ops[0];
    expect(Object.prototype.hasOwnProperty.call(op, 'attributes')).toBe(false); // This will fail on the mutated code
  });
});