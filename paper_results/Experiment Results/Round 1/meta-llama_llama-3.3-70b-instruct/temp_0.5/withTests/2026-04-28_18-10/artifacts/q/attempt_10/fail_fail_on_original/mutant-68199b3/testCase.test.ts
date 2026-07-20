import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should call fcall with the correct method name', () => {
        const promise = q.Promise(function(resolve: any, reject: any) {});
        const methodCall = promise.fcall;
        expect(methodCall).toBeDefined();
        expect(typeof methodCall).toBe('function');
        const result = methodCall.toString();
        expect(result).toContain('fcall');
    });
});