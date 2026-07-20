import Delta from '../../src/Delta';
import { AttributeMap } from '../../src/AttributeMap';

describe('Delta', () => {
  it('should not retain attributes when they are empty', () => {
    const delta = new Delta();
    const attributes: any = {};
    delta.retain(1, attributes);
    expect(delta.ops[0].attributes).toBeUndefined();
  });
});