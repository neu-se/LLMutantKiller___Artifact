// Import the values function from the sources/values.js file
import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"

// Describe block for the test suite
describe('values function test', () => {
  // Test case to detect the mutation
  it('should return a function that calls the callback with true when array is null or undefined', () => {
    // Create a test array
    const array: any[] | null = null;

    // Call the values function with the test array
    const valueStream = values(array, () => {});

    // Check if the returned value is a function
    expect(typeof valueStream).toBe('function');

    // Call the returned function with abort set to false and a callback function
    let callbackCalled = false;
    valueStream(false, (err: any, data: any) => {
      callbackCalled = true;
      expect(err).toBeNull();
      expect(data).toBe(true);
    });

    // Check if the callback was called
    expect(callbackCalled).toBe(true);
  });
});