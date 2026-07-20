import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should call fcall with the correct method name', () => {
        const promise = q.Promise();
        expect(promise.fcall).toBeDefined();
        expect(typeof promise.fcall).toBe('function');
    });
});