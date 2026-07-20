import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.noConflict', () => {
    it('should throw an error with a non-empty message when Q is not used as a global', () => {
        (global as any).Q = Q;
        let error: Error | null = null;
        try {
            Q.noConflict();
        } catch (e) {
            error = e as Error;
        }
        expect(error).not.toBeNull();
        expect(error!.message).not.toBe('');
        delete (global as any).Q;
    });
});