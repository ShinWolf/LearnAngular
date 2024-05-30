import { Component, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { FaceSnapComponent } from "../face-snap/face-snap.component";
import { FaceSnapsService } from '../services/face-snaps.service';
import { interval, take, tap } from 'rxjs';

@Component({
  selector: 'app-face-snap-list',
  standalone: true,
  templateUrl: './face-snap-list.component.html',
  styleUrl: './face-snap-list.component.scss',
  imports: [FaceSnapComponent]
})
export class FaceSnapListComponent implements OnInit {
  faceSnaps!: FaceSnap[];

  constructor(private faceSnapsService: FaceSnapsService) { }

  ngOnInit(): void {
    this.faceSnaps = this.faceSnapsService.getFaceSnaps();

    interval(1000).pipe(
      // Take si on connais le nombre de valeur a récupère mais si on change de component il sera tjr présent
      take(1),
      tap(console.log)
    ).subscribe();
  }
}