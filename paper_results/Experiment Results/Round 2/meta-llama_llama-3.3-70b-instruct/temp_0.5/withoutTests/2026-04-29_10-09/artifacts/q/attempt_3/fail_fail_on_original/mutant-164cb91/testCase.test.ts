import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections', () => {
        const promise = Q.reject('Test rejection');
        expect(Q.getUnhandledReasons()).toHaveLength(0);
        Q.nextTick.runAfter(() => {
            expect(Q.getUnhandledReasons()).toHaveLength(1);
        });
    });
});