import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should correctly determine if it is running in a Node.js environment', () => {
    // Create a mock process object
    const process = {
      toString: () => '[object process]',
      nextTick: () => {}
    };

    // Call the nextTick function with the mock process object
    const nextTick = Q.nextTick;
    nextTick(() => {});

    // Check if the requestTick function was called with process.nextTick
    expect(nextTick.requestTick).toBe(process.nextTick);
  });
});