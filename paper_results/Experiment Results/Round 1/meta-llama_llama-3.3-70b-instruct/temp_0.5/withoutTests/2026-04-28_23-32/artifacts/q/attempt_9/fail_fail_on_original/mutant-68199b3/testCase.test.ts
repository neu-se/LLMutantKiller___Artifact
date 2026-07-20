import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call the correct method when fcall is invoked', () => {
        const promise = Q.resolve(function test() { });
        const dispatchSpy = jest.spyOn(promise, 'dispatch');
        promise.fcall('apply');
        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(dispatchSpy).toHaveBeenCalledWith('apply', [void 0, []]);
    });

    it('should not call dispatch with an empty string as the method name', () => {
        const promise = Q.resolve(function test() { });
        const dispatchSpy = jest.spyOn(promise, 'dispatch');
        promise.fcall('');
        expect(dispatchSpy).toHaveBeenCalledTimes(0);
    });
});