import { ControlConfig } from '@angular/forms';

export type ControlConfigModel<T> = {
  [K in keyof T]: ControlConfig<T[K]>;
};
