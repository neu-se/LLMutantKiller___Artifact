import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when nextTick is not defined', () => {
        const originalNextTick = Q.nextTick;
        delete Q.nextTick;
        expect(() => Q.nextTick(() => {})).toThrowError();
        Q.nextTick = originalNextTick;
    });
});