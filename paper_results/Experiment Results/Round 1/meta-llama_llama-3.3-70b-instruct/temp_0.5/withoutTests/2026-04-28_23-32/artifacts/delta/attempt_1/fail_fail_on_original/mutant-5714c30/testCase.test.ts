import { Delta } from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly transform when thisData is null', () => {
    const delta1 = new Delta().insert({ foo: 'bar' });
    const delta2 = new Delta().retain(null);
    const transformedDelta = delta1.transform(delta2);
    expect(transformedDelta.ops).toEqual([{ retain: null }]);
  });
});