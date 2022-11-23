import { SelectableExampleModule } from './selectable-example.module';

describe('SelectedExampleModule', () => {
  let selectedExampleModule: SelectableExampleModule;

  beforeEach(() => {
    selectedExampleModule = new SelectableExampleModule();
  });

  it('should create an instance', () => {
    expect(selectedExampleModule).toBeTruthy();
  });
});
