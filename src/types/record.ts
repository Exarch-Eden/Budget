/**
 * Monetary record (whether it be an account transfer, expense, income, etc.)
 */

import { Category } from "./category";
import { Entity } from "./entity";
import { Currency, PaymentMethod, Timestamp } from "./misc";

type RecordType = "Income" | "Expense" | "AccountTransfer" | "ExternalTransfer"

export interface Record extends Entity {
    CreationDate: Timestamp;
    TransactionDate: Timestamp;
    AccountId: string;
    Type: RecordType;
    Amount: number;
    Category: Category;
    WarrantyEndDate?: Timestamp;
    Labels?: string[] // maybe rename to Tags
    Currency: Currency; // have a default of CAD
    RepeatTimer?: number; // number of milliseconds before repeating the transaction record
    Note?: string; // max 2000 chars
    PaymentMethod?: PaymentMethod;
    TemplateId?: string;
}
