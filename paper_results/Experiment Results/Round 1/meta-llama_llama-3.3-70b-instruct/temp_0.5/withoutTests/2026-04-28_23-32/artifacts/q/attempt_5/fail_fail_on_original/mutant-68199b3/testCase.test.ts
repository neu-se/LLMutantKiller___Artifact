import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when fcall is invoked with an empty string as the method name on the mutated code', () => {
        const promise = Q.resolve(function test() { });
        const dispatchSpy = jest.spyOn(promise, 'dispatch');
        expect(() => promise.fcall('')).toThrowError();
        expect(dispatchSpy).toHaveBeenCalledTimes(0);
    });
});