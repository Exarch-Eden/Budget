import { Actionable } from "./action";
import { Record } from "./record";

export interface Template extends Omit<Record, "Name" | "Id">, Actionable {}