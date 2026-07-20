import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should dispatch post with correct arguments', () => {
        const promise = Q.resolve({});
        const name = 'test';
        const args = ['arg1', 'arg2'];
        const dispatchSpy = jest.spyOn(promise, 'dispatch');
        promise.mapply(name, args);
        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(dispatchSpy).toHaveBeenCalledWith('post', [name, args]);
    });
});