import { Component, OnInit } from "@angular/core";
import { FaceSnap } from "../models/face-snap";
import { FaceSnapComponent } from "../face-snap/face-snap.component";
import { FaceSnapsService } from "../services/face-snaps.service";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-face-snap-list",
  standalone: true,
  templateUrl: "./face-snap-list.component.html",
  styleUrl: "./face-snap-list.component.scss",
  imports: [FaceSnapComponent, CommonModule]
})
export class FaceSnapListComponent implements OnInit {
  faceSnaps$!: Observable<FaceSnap[]>;

  constructor(private faceSnapsService: FaceSnapsService) { }

  ngOnInit(): void {
    this.faceSnaps$ = this.faceSnapsService.getFaceSnaps();
  }
}