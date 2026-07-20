import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('eachLine()', () => {
  it('passes correct line index to predicate when embed precedes newline', () => {
    const indices: number[] = [];

    const delta = new Delta()
      .insert({ image: 'pic.png' })
      .insert('\n')
      .insert('World')
      .insert('\n');

    delta.eachLine((line, attrs, i) => {
      indices.push(i);
    });

    expect(indices).toEqual([0, 1]);
  });
});