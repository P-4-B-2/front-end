import { Component } from '@angular/core';
import { DismissableAlertComponent } from "../../components/dismissable-alert/dismissable-alert.component";

@Component({
  selector: 'app-cost-analysis',
  standalone: true,
  imports: [DismissableAlertComponent],
  templateUrl: './cost-analysis.component.html',
  styleUrl: './cost-analysis.component.css'
})
export class CostAnalysisComponent {

}
