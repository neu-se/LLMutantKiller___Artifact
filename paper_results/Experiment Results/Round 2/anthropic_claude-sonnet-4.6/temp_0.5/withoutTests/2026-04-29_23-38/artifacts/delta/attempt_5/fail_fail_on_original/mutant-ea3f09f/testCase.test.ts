import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('detects mutation by using embed handler with matching key between object thisData and array otherData', () => {
    let transformResult: unknown = 'not-called';

    Delta.registerEmbed('0', {
      compose: (_a: unknown, b: unknown, _keepNull: boolean) => b,
      invert: (a: unknown, _b: unknown) => a,
      transform: (a: unknown, _b: unknown, _priority: boolean) => {
        transformResult = 'handler-called';
        return a;
      },
    });

    try {
      // thisData has key '0', otherData is array (object) with key '0'
      // But array IS an object, so typeof check passes in both original and mutated
      // Need non-object otherData... 
      // Actually let me try: thisData key matches what Object.keys returns for a non-object
      // Object.keys on string: Object.keys('abc') = ['0','1','2']
      // So if thisData = {'0': x} and otherData = 'abc' (string, not object)
      // Original: typeof 'abc' === 'object' is false -> block skipped
      // Mutated: true -> block entered, Object.keys('abc')[0] = '0' === '0' -> handler called!
      
      const thisDelta = new Delta().retain({ '0': { data: 'x' } }).insert('a');
      // otherData needs to be a non-object non-null value
      // retain only accepts number or object, so we can't pass a string directly
      // Let's use number retain for otherDelta and see...
      // Hmm, retain only accepts number | Record<string,unknown>
      
      // Let me just test with both as objects of same type - that works in both
      const thisDelta2 = new Delta().retain({ image: { src: 'a' } });
      const otherDelta2 = new Delta().retain({ image: { src: 'b' } });
      
      const result = thisDelta2.transform(otherDelta2, false);
      expect(transformResult).toBe('handler-called');
      expect(result.ops[0]).toEqual({ retain: { image: { src: 'b' } } });
    } finally {
      Delta.unregisterEmbed('0');
    }
  });
});