describe('Q', () => {
  it('should correctly determine if it is running in a Node.js environment', () => {
    // Check if process is defined
    expect(global.process).toBeDefined();

    // Check if process.toString returns '[object process]'
    expect(global.process.toString()).toBe('[object process]');

    // Check if process.nextTick is called when initializing Q
    const originalNextTick = global.process.nextTick;
    global.process.nextTick = jest.fn();
    (global as any).Q();
    expect(global.process.nextTick).toHaveBeenCalledTimes(1);
    global.process.nextTick = originalNextTick;
  });
});