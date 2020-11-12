export interface ContextMenuActionModel<T> {
  icon: string;
  name: string;
  isHidden: (actor: T) => boolean;
  action: (actor: T) => void;
}
