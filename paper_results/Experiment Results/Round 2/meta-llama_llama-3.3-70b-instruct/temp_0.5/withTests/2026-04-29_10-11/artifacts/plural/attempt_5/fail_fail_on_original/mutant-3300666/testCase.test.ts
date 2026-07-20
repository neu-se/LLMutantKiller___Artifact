// Import the plural function from the index module
const plural = require('./index');

// Define a test suite for the plural function
describe('plural function', () => {
  // Define a test case to check if the plural function works correctly
  it('should return the correct plural form', () => {
    // Check if the plural function returns the correct plural form for a word
    expect(typeof plural).toBe('function');
    expect(plural('test')).toBe('tests');
  });
});