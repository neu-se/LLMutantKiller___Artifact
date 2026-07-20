import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should throw an error with a correct message when a promise times out', async () => {
        jest.useFakeTimers();
        const promise = Q.timeout(Q.resolve(), 10);
        try {
            await promise;
            throw new Error('Expected promise to reject');
        } catch (error: any) {
            expect(error.message).toContain('ms');
        }
        jest.runAllTimers();
    });
});