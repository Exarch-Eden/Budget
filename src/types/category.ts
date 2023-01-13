import { Actionable } from "./action";
import { Entity } from "./entity";

export interface Category extends Actionable, Entity {
    Color?: string // preset colour pool for default
}
