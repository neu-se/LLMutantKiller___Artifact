import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with unregistered embed handler', () => {
  it('should throw error when transforming unregistered embed type', () => {
    // Create deltas with embed data for an unregistered type
    const delta1 = new Delta().retain({ unregistered: 'data1' });
    const delta2 = new Delta().retain({ unregistered: 'data2' });

    // This should throw an error in original code but not in mutated code
    expect(() => {
      delta1.transform(delta2, true);
    }).toThrow('no handlers for embed type "unregistered"');
  });
});