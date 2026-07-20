// Import the Q library
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

// Define a test suite for the nodeify function
describe("nodeify function", () => {
    // Test that the nodeify function calls the callback with the result of the promise
    it("should call the callback with the result of the promise", () => {
        // Create a promise that resolves to 10
        const promise = Q(10);
        
        // Initialize a flag to track whether the callback was called
        let called = false;
        
        // Call the nodeify function with a callback
        promise.nodeify((err: any, result: any) => {
            // Expect the error to be null
            expect(err).toBeNull();
            
            // Expect the result to be 10
            expect(result).toBe(10);
            
            // Set the flag to true
            called = true;
        });
        
        // Expect the flag to be true
        expect(called).toBe(true);
    });

    // Test that the nodeify function calls the callback with an error if the promise is rejected
    it("should call the callback with an error if the promise is rejected", () => {
        // Create a promise that rejects with an error
        const promise = Q.reject(new Error("Test error"));
        
        // Initialize a flag to track whether the callback was called
        let called = false;
        
        // Call the nodeify function with a callback
        promise.nodeify((err: any, result: any) => {
            // Expect the error to be an instance of Error
            expect(err).toBeInstanceOf(Error);
            
            // Expect the error message to be "Test error"
            expect(err.message).toBe("Test error");
            
            // Expect the result to be undefined
            expect(result).toBeUndefined();
            
            // Set the flag to true
            called = true;
        });
        
        // Expect the flag to be true
        expect(called).toBe(true);
    });

    // Test that the nodeify function returns undefined if no callback is provided in the mutated code
    it("should return undefined if no callback is provided in the mutated code", () => {
        // Create a promise that resolves to 10
        const promise = Q(10);
        
        // Call the nodeify function without a callback
        const result = promise.nodeify();
        
        // Expect the result to be undefined
        expect(result).toBeUndefined();
    });
});