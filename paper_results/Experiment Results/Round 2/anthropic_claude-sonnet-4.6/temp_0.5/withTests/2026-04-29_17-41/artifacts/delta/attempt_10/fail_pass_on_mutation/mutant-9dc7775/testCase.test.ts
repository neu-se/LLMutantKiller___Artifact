import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('transform retain with embed object against retain with embed object uses handler', () => {
    let transformCallCount = 0;
    Delta.registerEmbed<string>('delta', {
      compose: (a: string, b: string) => a + b,
      transform: (a: string, b: string, priority: boolean) => {
        transformCallCount++;
        return priority ? b : a + b;
      },
      invert: (a: string, b: string) => b,
    });

    try {
      const a = new Delta().retain({ delta: 'x' });
      const b = new Delta().retain({ delta: 'y' });
      
      a.transform(b, true);
      expect(transformCallCount).toBe(1);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});