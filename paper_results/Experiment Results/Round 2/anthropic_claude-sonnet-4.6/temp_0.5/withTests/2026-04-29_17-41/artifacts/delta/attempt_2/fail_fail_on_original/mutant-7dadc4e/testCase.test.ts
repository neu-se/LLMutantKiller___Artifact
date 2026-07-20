import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('transform with null retain uses length as transformedData, not null', () => {
    // Construct ops with retain: null directly to reach the mutation code path
    // In OpIterator, typeof null === 'object' is true, so { retain: null } is treated as a retain op
    // In the transform else-branch:
    //   Original: typeof null === 'object' && null !== null = false => transformedData = length (1) => retain(1) => chopped => empty
    //   Mutated:  typeof null === 'object' && true           = true  => transformedData = null       => retain(null) => NOT chopped => [{ retain: null }]
    const a = new Delta({ ops: [{ retain: null as any }] });
    const b = new Delta({ ops: [{ retain: null as any }] });
    const result = a.transform(b, false);
    expect(result).toEqual(new Delta());
  });
});