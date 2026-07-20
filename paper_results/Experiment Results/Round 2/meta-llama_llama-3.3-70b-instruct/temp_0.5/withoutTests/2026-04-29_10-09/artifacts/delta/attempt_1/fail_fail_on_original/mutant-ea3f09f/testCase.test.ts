import { Delta } from '../../../src/Delta';
import { AttributeMap } from '../../../src/AttributeMap';

describe('Delta', () => {
  it('should transform correctly when otherData is null', () => {
    const delta1 = new Delta();
    delta1.retain({ embed: 'data1' }, new AttributeMap());
    const delta2 = new Delta();
    delta2.retain(null, new AttributeMap());
    const transformed = delta1.transform(delta2);
    expect(transformed.length()).toBe(1);
    expect(transformed.ops[0].retain).toBeNull();
  });
});