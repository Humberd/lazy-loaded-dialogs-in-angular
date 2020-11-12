import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ContextMenuActionModel } from '../models/context-menu-action.model';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuComponent<T> {
  @Input() actions: ContextMenuActionModel<T>[];
  @Input() actor: T;
}
