import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle promise chains', () => {
        const promise = Q.resolve(1)
            .then((value: any) => {
                return Q.resolve(value + 1);
            })
            .then((value: any) => {
                throw new Error('Test error');
            })
            .catch((error: any) => {
                const stackLines = error.stack.split('\n');
                expect(stackLines.length).toBeGreaterThan(5);
                expect(stackLines[0]).toContain('Test error');
                return Q.resolve(2);
            })
            .then((value: any) => {
                return Q.resolve(value + 1);
            })
            .then((value: any) => {
                expect(value).toBe(3);
            });

        return promise;
    });
});