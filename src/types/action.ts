import { Entity } from "./entity";

/**
 * Actions is an advanced edit feature where users can customize
 * their UX and flow by attaching an action to specific categories (as an example)
 * which are triggered on category selection when inserting data.
 */

// examples of Action: open store selector, open note editor
export interface Action extends Entity {
    Function: Function; // the action executed when called
}

export interface Actionable {
    ActionSequence: Action[]; // executes Actions based on array order
}
