describe('module loading side effects', () => {
  it('should log "for testing purpose" when loaded fresh (module.parent is null in Jest)', () => {
    const logged: string[] = [];
    const spy = jest.spyOn(console, 'log').mockImplementation((...args) => {
      logged.push(args.join(' '));
    });

    jest.resetModules();
    require('../../../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');

    spy.mockRestore();

    expect(logged.some(l => l.includes('for testing purpose'))).toBe(true);
  });
});