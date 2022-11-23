import { DraggableExampleModule } from './draggable-example.module';

describe('DraggableExampleModule', () => {
  let draggableExampleModule: DraggableExampleModule;

  beforeEach(() => {
    draggableExampleModule = new DraggableExampleModule();
  });

  it('should create an instance', () => {
    expect(draggableExampleModule).toBeTruthy();
  });
});
