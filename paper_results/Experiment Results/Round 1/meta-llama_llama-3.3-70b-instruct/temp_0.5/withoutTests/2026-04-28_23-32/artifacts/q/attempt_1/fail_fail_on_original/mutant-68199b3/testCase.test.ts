import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should call the correct method when fcall is invoked', () => {
        const promise = Q.resolve(function () { });
        const spy = jest.fn();
        promise.fcall(spy);
        expect(spy).toHaveBeenCalledTimes(1);
    });
});