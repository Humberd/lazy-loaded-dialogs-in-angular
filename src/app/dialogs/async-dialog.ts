import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Directive } from '@angular/core';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AsyncDialog<ComponentType, DataType, ReturnType = unknown> {
  constructor(protected matDialog: MatDialog) {
  }

  abstract async open(data: DataType): Promise<MatDialogRef<ComponentType, ReturnType>>;
}
