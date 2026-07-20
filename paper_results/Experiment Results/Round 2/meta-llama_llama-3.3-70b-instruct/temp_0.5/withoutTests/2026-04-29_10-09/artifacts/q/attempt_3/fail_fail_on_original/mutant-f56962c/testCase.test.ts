import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should call dispatch with the correct arguments when fcall is called', () => {
        const promise = Q();
        const dispatchSpy = jest.fn();
        promise.dispatch = dispatchSpy;
        promise.fcall('test');
        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(dispatchSpy).toHaveBeenCalledWith('apply', [void 0, ['test']]);
    });
});