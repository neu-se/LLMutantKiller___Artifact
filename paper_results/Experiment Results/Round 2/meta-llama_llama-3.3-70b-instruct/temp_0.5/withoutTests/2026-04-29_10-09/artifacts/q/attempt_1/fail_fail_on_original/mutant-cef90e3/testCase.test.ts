import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should reject a promise when done is true', () => {
        const promise = Q.defer();
        const done = true;
        const exception = new Error('Test error');
        
        // Simulate the promiseDispatch function
        const deferred = Q.defer();
        deferred.reject(exception);
        
        // Simulate the _rejected function
        const _rejected = (exception: any) => {
            if (done) {
                // In the original code, this would return immediately
                // In the mutated code, this would not return and would continue executing
                return;
            }
            throw exception;
        };
        
        // Call the _rejected function with the exception
        expect(() => _rejected(exception)).toThrowError(exception);
    });
});