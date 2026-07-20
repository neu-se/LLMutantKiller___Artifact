import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should correctly handle isStopIteration function', () => {
        // Create a function that returns a promise
        function testFunction() {
            return Q(function(resolve: (value: any) => void, reject: (reason: any) => void) {
                // Simulate a StopIteration exception
                try {
                    throw new Error('StopIteration');
                } catch (e: any) {
                    reject(e);
                }
            });
        }

        // Check if the promise is correctly rejected
        testFunction().then(function() {
            expect(true).toBe(false); // This should not be called
        }).catch(function(e: any) {
            expect(e.message).toBe('StopIteration');
        });
    });
});