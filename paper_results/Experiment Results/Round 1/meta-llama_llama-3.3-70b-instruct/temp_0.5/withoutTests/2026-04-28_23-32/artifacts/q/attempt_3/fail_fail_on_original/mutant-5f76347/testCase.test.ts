import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should dispatch delete operation with the correct key', () => {
        const object = { foo: 'bar' };
        const dispatchSpy = jest.fn();
        Q(object).dispatch = dispatchSpy;
        Q(object).del('foo');
        expect(dispatchSpy).toBeCalledWith('delete', ['foo']);
    });
});