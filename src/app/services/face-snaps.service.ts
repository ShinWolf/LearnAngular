import { Injectable } from "@angular/core";
import { FaceSnap } from "../models/face-snap";
import { SnapType } from "../models/snap-type.type";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FaceSnapsService {
    private faceSnaps: FaceSnap[] = [];

    constructor(private http: HttpClient) { }

    generateId(): string {
        return crypto.randomUUID().substring(0, 8);
    }

    getFaceSnaps(): Observable<FaceSnap[]> {
        return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps');
    }

    // snapFaceSnapById(faceSnapId: string, snapType: SnapType): void {
    //     this.getFaceSnapById(faceSnapId).snap(snapType);
    // }

    getFaceSnapById(faceSnapId: string): Observable<FaceSnap> {
        return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`);
    }

    addFaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string }): void {
        const faceSnap = new FaceSnap(
            formValue.title,
            formValue.description,
            formValue.imageUrl,
            new Date(),
            0
        );

        this.faceSnaps.push(faceSnap);
    }
}