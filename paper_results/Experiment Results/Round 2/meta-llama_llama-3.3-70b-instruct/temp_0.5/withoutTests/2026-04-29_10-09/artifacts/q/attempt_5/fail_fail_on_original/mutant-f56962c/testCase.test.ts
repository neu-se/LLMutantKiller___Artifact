import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should throw an error when fcall is called on a promise with an empty implementation', () => {
        const promise = Q();
        // Simulate the mutated code by overriding the fcall method
        promise.fcall = function () {};
        expect(() => promise.fcall()).toThrowError();
    });
});