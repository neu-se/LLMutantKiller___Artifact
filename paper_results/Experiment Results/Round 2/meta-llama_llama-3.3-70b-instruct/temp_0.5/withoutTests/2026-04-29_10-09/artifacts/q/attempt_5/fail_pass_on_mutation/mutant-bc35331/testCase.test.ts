describe('Q', () => {
  it('should correctly determine if it is running in a Node.js environment', () => {
    // Check if process is defined
    expect(global.process).toBeDefined();

    // Check if process.toString returns '[object process]'
    expect(global.process.toString()).toBe('[object process]');

    // Check if process.nextTick is a function
    expect(typeof global.process.nextTick).toBe('function');
  });
});