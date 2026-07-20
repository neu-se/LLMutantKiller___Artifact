import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should call fcall with the correct method name', () => {
        const promise = Q(function () { });
        const methodCall = promise.fcall;
        expect(methodCall).toBeInstanceOf(Function);
        expect(methodCall.name).toBe('fcall');
    });
});