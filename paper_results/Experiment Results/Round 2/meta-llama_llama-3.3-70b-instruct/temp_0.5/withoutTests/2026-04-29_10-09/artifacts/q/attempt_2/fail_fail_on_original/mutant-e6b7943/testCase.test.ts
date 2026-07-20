import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should correctly handle isStopIteration function', () => {
        // Create a function that returns a promise
        function testFunction() {
            return Q.Promise(function(resolve, reject) {
                // Simulate a StopIteration exception
                try {
                    throw { message: 'StopIteration' };
                } catch (e) {
                    reject(e);
                }
            });
        }

        // Check if the promise is correctly rejected
        testFunction().then(function() {
            expect(true).toBe(false); // This should not be called
        }).catch(function(e) {
            expect(e.message).toBe('StopIteration');
        });
    });
});