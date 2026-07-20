import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('exposes mutation in compose retain-start optimization', () => {
    // When other starts with a plain retain of length N,
    // and this starts with inserts whose individual lengths fit within N,
    // the original pushes otherIter.next() (advancing otherIter without thisIter).
    // With mutation=false, it falls to else branch which processes both together.
    // The difference shows when other has an insert AFTER the initial retain
    // that should appear between this's inserts.
    const a = new Delta().insert('A').insert('B');
    const b = new Delta().retain(1).insert('X').retain(1);
    const expected = new Delta().insert('A').insert('X').insert('B');
    expect(a.compose(b)).toEqual(expected);
  });
});