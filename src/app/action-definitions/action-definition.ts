import { ContextMenuActionModel } from '../shared/context-menu/models/context-menu-action.model';
import { ActionDefinitionContextMenu } from './action-definition-context-menu';
import { BuildConfig } from './build-config';
import { isObservable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ActionResult } from './action-result';

export abstract class ActionDefinition<Params> {
  build<Actor>(config: BuildConfig<Actor, Params>): ContextMenuActionModel<Actor> {
    const menu = this.getMenu();

    return {
      name: menu.name,
      icon: menu.icon,
      isHidden: actor => config.isHidden?.(actor),
      action: async actor => {
        const result = await this.invoke(config.resolveParams(actor));
        if (isObservable(result)) {
          result
            .pipe(take(1))
            .subscribe(() => config.onSuccess?.());
        } else {
          config.onSuccess?.();
        }
      },
    };
  }

  abstract invoke(params: Params): ActionResult;

  protected abstract getMenu(): ActionDefinitionContextMenu;
}
