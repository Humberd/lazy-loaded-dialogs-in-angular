export interface BuildConfig<Actor, Params> {
  resolveParams: (actor: Actor) => Params;
  isHidden?: (actor: Actor) => boolean;
  onSuccess?: () => void;
}
