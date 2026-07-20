import Delta from '../../../src/Delta';
import { AttributeMap } from '../../../src/AttributeMap';

describe('Delta', () => {
  it('should transform correctly when thisData is not an object', () => {
    const delta1 = new Delta().insert('Hello', new AttributeMap({ bold: true }));
    const delta2 = new Delta().insert('World', new AttributeMap({ italic: true }));
    const transformedDelta = delta1.transform(delta2, true);
    expect(transformedDelta.ops.length).toBe(1);
    expect(transformedDelta.ops[0].retain).toBe('Hello');
    expect(transformedDelta.ops[0].attributes).toEqual(new AttributeMap({ bold: true }));
  });
});