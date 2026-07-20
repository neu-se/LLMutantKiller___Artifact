import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should not throw an error when fcall is called on a promise with the original implementation', () => {
        const promise = Q();
        expect(() => promise.fcall('test')).not.toThrowError();
    });
});