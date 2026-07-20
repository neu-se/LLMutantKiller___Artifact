import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should transform with handler', () => {
    const delta1 = new Delta();
    delta1.insert({ embed: 'data1' });
    const delta2 = new Delta();
    delta2.insert({ embed: 'data2' });
    Delta.registerEmbed('embed', {
      compose: (a: any, b: any, keepNull: boolean) => a,
      invert: (a: any, b: any) => a,
      transform: (a: any, b: any, priority: boolean) => {
        if (a !== b) {
          throw new Error('Transform error');
        }
        return a;
      },
    });
    expect(() => delta1.transform(delta2)).toThrowError('Transform error');
  });
});