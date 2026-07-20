// test-case.test.ts
import { console } from 'console';
import './test-module.js';

describe('parse function', () => {
  it('should not log anything to the console when the module is required as a module', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    expect(consoleLogSpy).not.toHaveBeenCalled();
  });
});