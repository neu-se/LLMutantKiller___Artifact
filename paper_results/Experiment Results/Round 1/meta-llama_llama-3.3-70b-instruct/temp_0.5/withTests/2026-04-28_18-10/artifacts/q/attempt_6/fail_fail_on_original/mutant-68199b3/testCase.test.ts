import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should call fcall with the correct method name', () => {
        const promise = q.Promise(function(resolve, reject) {});
        const methodCall = promise.fcall;
        expect(methodCall.name).toBe('fcall');
    });
});