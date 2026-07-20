import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';
import { AttributeMap } from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('Delta', () => {
  it('should transform correctly when thisData is an object and otherData is an object', () => {
    const delta1 = new Delta().insert({ embed: 'Hello' }, new AttributeMap({ bold: true }));
    const delta2 = new Delta().insert({ embed: 'World' }, new AttributeMap({ italic: true }));
    Delta.registerEmbed('embed', {
      compose: (a, b, keepNull) => a + b,
      invert: (a, b) => a + b,
      transform: (a, b, priority) => priority? b : a,
    });
    const transformedDelta = delta1.transform(delta2, true);
    expect(transformedDelta.ops.length).toBe(1);
    expect(transformedDelta.ops[0].retain).toEqual({ embed: 'World' });
    expect(transformedDelta.ops[0].attributes).toEqual(new AttributeMap({ italic: true }));
  });
});