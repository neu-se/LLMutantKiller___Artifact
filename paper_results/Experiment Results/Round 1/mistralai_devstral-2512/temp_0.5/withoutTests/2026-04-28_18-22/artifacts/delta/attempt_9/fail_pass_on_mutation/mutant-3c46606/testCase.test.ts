import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embed handler', () => {
  it('should throw error when transforming unregistered embed type', () => {
    // Create deltas with embed data for unregistered type
    const delta1 = new Delta().retain({ unregistered: 'data1' });
    const delta2 = new Delta().retain({ unregistered: 'data2' });

    // Original code throws error when handler not registered
    // Mutated code skips handler check and doesn't throw
    expect(() => {
      delta1.transform(delta2, true);
    }).toThrow('no handlers for embed type "unregistered"');
  });
});