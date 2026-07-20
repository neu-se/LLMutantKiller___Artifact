import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should compose correctly when action is retain', () => {
    const embedType = 'test';
    const handler = {
      compose: (a: any, b: any, keepNull: boolean) => {
        if (keepNull) return { a, b };
        return a;
      },
      invert: (a: any, _b: any) => a,
      transform: (a: any, _b: any, _priority: boolean) => a,
    };
    Delta.registerEmbed(embedType, handler);

    const delta1 = new Delta();
    delta1.retain({ [embedType]: 'data1' });
    const delta2 = new Delta();
    delta2.retain({ [embedType]: 'data2' });

    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops[0].retain).toEqual({ [embedType]: { a: 'data1', b: 'data2' } });
  });
});