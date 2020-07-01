import { NgModule } from '@angular/core';
import { StateService } from '../services/state.service';
import { PollService } from '../services/poll.service';

@NgModule({
  providers: [
    StateService,
    PollService,
  ]
})
export class SingletonModule {
}
