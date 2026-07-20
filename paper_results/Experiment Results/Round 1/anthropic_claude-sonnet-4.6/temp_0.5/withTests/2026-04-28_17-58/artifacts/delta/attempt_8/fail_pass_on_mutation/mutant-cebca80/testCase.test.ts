import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert() mutation detection', () => {
  it('does not apply embed handler after processing a delete operation', () => {
    Delta.registerEmbed<string>('custom', {
      compose: (a, b) => b,
      invert: (a, b) => b,
      transform: (a, b, _priority) => b,
    });

    try {
      // A simple delete op - in mutated code, after forEach the else if(true) 
      // embed handler block executes, calling getEmbedTypeAndData on op.retain
      // which is undefined, throwing "cannot retain a undefined"
      const delta = new Delta().delete(1);
      const base = new Delta().insert('a').insert({ custom: 'data' });

      // Should simply invert the delete to an insert of 'a'
      const expected = new Delta().insert('a');
      const inverted = delta.invert(base);

      expect(inverted).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('custom');
    }
  });
});