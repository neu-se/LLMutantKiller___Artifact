import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should call onUnhandledError with the correct context when process.domain is truthy', () => {
        const originalProcess = global.process;
        global.process = { domain: { bind: jest.fn() } } as any;

        const onUnhandledError = jest.fn();
        Q.done(Q.resolve(), null, null, null);
        onUnhandledError();

        expect(onUnhandledError).toHaveBeenCalledTimes(1);

        global.process = originalProcess;
    });
});