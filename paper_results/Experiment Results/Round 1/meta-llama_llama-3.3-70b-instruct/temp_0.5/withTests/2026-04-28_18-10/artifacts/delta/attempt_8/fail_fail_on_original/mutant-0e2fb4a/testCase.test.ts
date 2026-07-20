import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  beforeEach(() => {
    Delta.registerEmbed('embed', {
      compose: (a, b) => a,
      transform: (a, b, priority) => a,
      invert: (a, b) => a,
    });
  });

  afterEach(() => {
    Delta.unregisterEmbed('embed');
  });

  it('should invert a delta with a retain operation on an object', () => {
    const delta = new Delta().retain(null);
    const base = new Delta().insert({ embed: 1 });
    expect(() => delta.invert(base)).toThrowError('cannot retain a null');
  });
});