import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-apply-dialog",
  templateUrl: "./apply-dialog.component.html",
  styleUrls: ["./apply-dialog.component.css"],
})
export class ApplyDialogComponent {
  @Output() submitData: EventEmitter<string> = new EventEmitter<string>();

  submitFormData(data: string): void {
    this.submitData.emit(data);
  }
}
