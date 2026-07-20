import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call the correct method when fcall is invoked', () => {
        const promise = Q.resolve(function test() { });
        const dispatchSpy = jest.spyOn(promise, 'dispatch');
        promise.fcall('apply');
        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(dispatchSpy).toHaveBeenCalledWith('apply', [void 0, []]);
        
        // Test the mutation by checking if an empty string is passed to dispatch
        const promise2 = Q.resolve(function test() { });
        const dispatchSpy2 = jest.spyOn(promise2, 'dispatch');
        expect(() => promise2.fcall('')).toThrowError();
        expect(dispatchSpy2).toHaveBeenCalledTimes(0);
    });
});