import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should filter internal and Node.js frames from stack traces', () => {
        // Create a promise that rejects with an error
        const promise = Q.reject(new Error('Test error'));

        // Catch the error and get its stack trace
        let stackTrace: string | undefined;
        promise.catch((error: any) => {
            stackTrace = error.stack;
        });

        // Wait for the promise to settle
        return promise.then(() => {
            // Check if the stack trace is not empty
            expect(stackTrace).not.toBeUndefined();

            // Check if the stack trace does not contain internal or Node.js frames
            const lines = stackTrace!.split('\n');
            for (const line of lines) {
                expect(line).not.toContain('at Object.<anonymous>');
                expect(line).not.toContain('at Module._compile');
                expect(line).not.toContain('at Module._extensions.');
                expect(line).not.toContain('at Module.load');
                expect(line).not.toContain('at Function.Module._load');
                expect(line).not.toContain('at Module.require');
                expect(line).not.toContain('at require');
                expect(line).not.toContain('at node:internal');
            }
        });
    });
});