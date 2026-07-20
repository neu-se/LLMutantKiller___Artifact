import { Q } from "./q.js";

describe('Q', () => {
    it('should call the correct method when fcall is invoked', () => {
        const promise = Q.resolve(function test() { });
        const spy = jest.fn();
        promise.fcall(spy);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith();
        
        // Test the mutation by checking if an empty string is passed to dispatch
        const promise2 = Q.resolve(function test() { });
        const dispatchSpy = jest.spyOn(promise2, 'dispatch');
        promise2.fcall('');
        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(dispatchSpy).toHaveBeenCalledWith('', [void 0, []]);
    });
});