import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should properly handle the laterQueue', () => {
        Q.nextTick.runAfter(() => {
            throw new Error('Test error');
        });
        expect(() => {
            Q.nextTick.runAfter(() => {
                throw new Error('Test error 2');
            });
        }).not.toThrow();
    });
});