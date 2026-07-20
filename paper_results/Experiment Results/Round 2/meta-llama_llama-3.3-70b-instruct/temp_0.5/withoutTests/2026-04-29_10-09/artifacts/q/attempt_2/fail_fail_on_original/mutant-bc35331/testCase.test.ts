import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should correctly determine if it is running in a Node.js environment', () => {
    // Create a mock process object
    const originalProcess = global.process;

    // Set up a mock process object
    global.process = {
      toString: () => '[object process]',
      nextTick: jest.fn()
    };

    // Call the Q function to initialize it
    const QInstance = Q();

    // Check if process.nextTick was called when initializing Q
    expect(global.process.nextTick).toHaveBeenCalledTimes(1);

    // Restore the original process object
    global.process = originalProcess;
  });
});