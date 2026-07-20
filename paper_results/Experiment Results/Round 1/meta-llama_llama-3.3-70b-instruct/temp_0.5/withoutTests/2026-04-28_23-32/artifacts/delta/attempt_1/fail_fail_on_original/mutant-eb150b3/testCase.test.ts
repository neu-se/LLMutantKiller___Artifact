import { Delta } from '../../../src/Delta';

describe('Delta', () => {
  it('should compose correctly when action is retain', () => {
    const delta1 = new Delta();
    delta1.retain({ embed: 'data1' });
    const delta2 = new Delta();
    delta2.retain({ embed: 'data2' });
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops[0].retain).toEqual({ embed: expect.any(Function) });
  });
});