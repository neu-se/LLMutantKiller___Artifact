import { Delta } from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should retain length and attributes correctly', () => {
    const delta = new Delta();
    delta.retain(5, { foo: 'bar' });
    expect(delta.ops[0].retain).toBe(5);
    expect(delta.ops[0].attributes).toEqual({ foo: 'bar' });
  });
});