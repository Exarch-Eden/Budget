import { Entity } from "./entity";
import { Timestamp } from "./misc";

type AccountType = "Savings" | "Chequing";

export interface Account extends Entity {
    Type: AccountType;
    CreationDate: Timestamp;
}
