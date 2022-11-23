import { FocusedExampleModule } from './focused-example.module';

describe('FocusedExampleModule', () => {
  let focusedExampleModule: FocusedExampleModule;

  beforeEach(() => {
    focusedExampleModule = new FocusedExampleModule();
  });

  it('should create an instance', () => {
    expect(focusedExampleModule).toBeTruthy();
  });
});
