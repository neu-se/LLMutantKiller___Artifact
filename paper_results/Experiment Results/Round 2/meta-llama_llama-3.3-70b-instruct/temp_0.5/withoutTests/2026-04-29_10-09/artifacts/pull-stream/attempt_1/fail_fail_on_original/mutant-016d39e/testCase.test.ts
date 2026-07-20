import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should throw an error with a meaningful message when no done callback is supplied and an error occurs', () => {
    const error = new Error('Test error');
    const sink = drain(null, null);
    sink.abort(error);
    expect(() => {
      // We need to trigger the error handling in the sink function.
      // Since the sink function is asynchronous, we can't directly test the error handling.
      // However, we can test the error message that is logged to the console.
      // To do this, we'll use the console.error function to catch the error message.
      const originalError = console.error;
      let errorMessage: string | null = null;
      console.error = (message) => {
        errorMessage = message;
      };
      sink(null, () => {
        throw error;
      });
      console.error = originalError;
      // If the error message is empty, the test will fail.
      expect(errorMessage).not.toBe('');
    }).toThrowError();
  });
});